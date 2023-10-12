/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * @requires    ksmf
 * @requires    kscryp
 * @requires    ioc
 * @requires    enum
 **/

const ksmf = require("ksmf");
const kscryp = require('kscryp');
const enums = require("../cfg/enum.json");
class OauthController {

    getHandler({ domain }) {
        let name = domain?.name ? domain.name.replace(/\s+/g, '') : "";
        let handler = name && this.helper.get("cdm.service." + name);
        if (domain && handler) {
            return handler;
        }
        handler = domain && this.helper.get("cdm.service." + domain?.idpType);
        if (domain && handler) {
            return handler;
        }
        return this.helper.get("cdm.service.OauthService");
    }

    async init() {
        this.logger = this.helper.get('logger');
        this.srvDomain = this.helper.get("cdm.service.Domain");
        this.srvCredential = this.helper.get("cdm.service.Credential");
        this.srvCredentialState = this.helper.get("cdm.service.CredentialState");
        this.srvAccount = this.helper.get("cdm.service.Account");
        this.srvOauthService = this.helper.get("cdm.service.OauthService");
    }

    /**
     * @description STEP 1 Authorization Code flow: https://datatracker.ietf.org/doc/html/rfc6749
     * @param {Object} req
     * @param {String} req.query.response_type [REQUIRED]
     * @param {String} req.query.client_id [REQUIRED]
     * @param {String} req.query.redirect_uri [OPTIONAL]
     * @param {String} req.query.user_id [OPTIONAL]
     * @param {String} req.query.domain [OPTIONAL]
     * @param {String} req.query.scope [OPTIONAL]
     * @param {String} req.query.state [RECOMMENDED]
     * @param {Object} res 
     */
    async authorize(req, res) {
        const params = this.getAuthData(req);
        const domainId = parseInt(params.domain || (params.state || "").trim().split(" ")[0]);
        const flow = req.flow;
        const affiliate = params.affiliate;

        // track credential state
        const state = await this.srvCredentialState.save({
            data: {
                domainId,
                userId: params.userId,
                flow: parseInt(params.flow),
                state: params.state,
                scope: params.scope,
                userAgent: params.userAgent,
                redirectUri: params.redirectUri,
                affiliate,
                note: "STEP 1: init"
            },
            mode: this.srvCredentialState.constant.action.create
        });

        // domain verification
        const domain = await this.srvDomain.select({
            where: {
                id: domainId
            },
            limit: 1
        });
        if (!domain) {
            return state.redirectUri ?
                res.redirect(ksmf.app.Url.self().add(state.redirectUri, { error: "invalid_request" })) :
                res.status(400).json({ error: "invalid_request" });
        }

        // Oauth handler verification
        const handler = this.getHandler({ domain, flow });
        if (!handler?.authorize) {
            return state.redirectUri ?
                res.redirect(ksmf.app.Url.self().add(state.redirectUri, { error: "invalid_request" })) :
                res.status(400).json({ error: "invalid_request" });
        }
        handler?.inject instanceof Function && handler.inject({ srvAccount: this.srvAccount });

        // credential verification
        this.srvCredential.generate(params, { strict: true });
        const credential = await this.srvCredential.save({
            data: {
                clientId: params.clientId,
                redirectUri: params.redirectUri,
                type: enums.type.apikey,
                status: 1,
            },
            where: { clientId: params.clientId },
            mode: domain.asUserAction
        });
        if (!credential) {
            return state.redirectUri ?
                res.redirect(ksmf.app.Url.self().add(state.redirectUri, { error: "invalid_request" })) :
                res.status(400).json({ error: "invalid_request" });
        }

        // credential state updating
        const credentialState = await this.srvCredentialState.save({
            data: {
                domainId: domain.id,
                credentialId: credential?.id,
                status: 1,
                note: "STEP 1: Run IDP handler"
            },
            row: state,
            mode: this.srvCredentialState.constant.action.update
        });
        const token = this.srvOauthService.encode({ flow, stateId: state?.id });

        // proceed with the authentication
        const url = await handler?.authorize({ domain, credential, token, state: credentialState, flow }, req, res);
        return typeof url === "string" ? (url ? res.redirect(url) : res.redirect(ksmf.app.Url.self().add(state.redirectUri, { error: "invalid_request" }))) : null;
    }

    /**
     * @description STEP 2 Authorization Code flow: callback middleware 
     * @param {Object} req
     * @param {String} req.query.code [REQUIRED]
     * @param {String} req.query.state [REQUIRED]
     * @param {String} req.query.error [OPTIONAL] (invalid_request, unauthorized_client, access_denied, unsupported_response_type, invalid_scope, server_error, temporarily_unavailable)
     * @param {String} req.query.error_description [OPTIONAL] https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
     * @param {String} req.query.error_uri [OPTIONAL]
     * @param {Object} res 
     */
    async authorizeBack(req, res) {
        let params = this.getAuthData(req);
        let { state, code, scope, flow } = params;
        let payload = this.srvOauthService.decode(state);
        let flowInit = flow;
        flow = payload.flow || flow;

        const credentialState = await this.srvCredentialState.save({
            data: { code },
            where: { id: payload.stateId, flow: parseInt(flow) },
            mode: this.srvCredentialState.constant.action.update
        });

        this.logger?.info({
            flow,
            src: "Controller:OAuth:Authorize:Back",
            flow_init: flowInit,
            data: params
        });

        // domain verification
        if (!credentialState?.Domain) {
            return credentialState?.redirectUri ?
                res.redirect(ksmf.app.Url.self().add(credentialState.redirectUri, { error: "invalid_request" })) :
                res.status(400).json({ error: "invalid_request" });
        }
        // credential verification
        if (!credentialState?.Credential) {
            return credentialState?.redirectUri ?
                res.redirect(ksmf.app.Url.self().add(credentialState.redirectUri, { error: "invalid_request" })) :
                res.status(400).json({ error: "invalid_request" });
        }

        const handler = this.getHandler({ domain: credentialState.Domain, flow });
        const url = await handler.authorizeBack({
            domain: credentialState.Domain,
            credential: credentialState.Credential,
            state: credentialState,
            flow,
            code,
            scope
        }, req, res);

        if (typeof url === "string") {
            if (!url) {
                (req?.session?.destroy instanceof Function) && req.session.destroy();
                return res.redirect(ksmf.app.Url.self().add(credentialState.redirectUri || credentialState.Credential?.redirectUri, { error: "invalid_request" }));
            }
            res.redirect(url);
        }
    }

    /**
     * @description STEP 3 Authorization Code flow: Tokens, https://datatracker.ietf.org/doc/html/rfc6749#section-4.2.2
     * @param {Object} req
     * @param {String} req.body.grant_type [REQUIRED]
     * @param {String} req.body.code [REQUIRED]
     * @param {String} req.body.redirect_uri [REQUIRED]
     * @param {String} req.body.client_id [OPTIONAL]
     * @param {String} req.header.Authorization [REQUIRED] Basic 
     * @param {String} req.body.username [REQUIRED] only on grant_type = password
     * @param {String} req.body.password [REQUIRED] only on grant_type = password
     * @param {String} req.body.scope [OPTIONAL]
     * @param {Object} res 
     * @returns { access_token: String, refresh_token: String, token_type: String, expires_in: String, scope: String, state: String }
     */
    async token(req, res) {
        let params = this.getAuthData(req);
        let payload = null;
        this.srvOauthService.inject({
            srvState: this.srvCredentialState,
            srvCredential: this.srvCredential
        });
        const src = await this.srvOauthService.extract(params);
        if (!src) {
            (req?.session?.destroy instanceof Function) && req.session.destroy();
            return res.status(400).json({
                "error": "invalid_request",
                "error_description": "Request was missing the 'redirect_uri' parameter."
            });
        }
        params.flow = src.flow;

        const handler = this.getHandler({ domain: src.state.Domain, flow: params.flow });
        handler?.inject instanceof Function && handler.inject({
            srvState: this.srvCredentialState,
            srvCredential: this.srvCredential,
            srvDomain: this.srvDomain,
            srvAccount: this.srvAccount
        });

        switch (params.grantType) {
            case 'authorization_code':
                payload = await handler.getAuthorizationCode({
                    clientId: params.clientId,
                    clientSecret: params.clientSecret,
                    redirectUri: params.redirectUri,
                    code: params.code,
                    codeVerifier: params.codeVerifier,
                    grantType: params.grantType,
                    userAgent: params.userAgent,
                    flow: params.flow,
                    row: src.state
                });
                break;

            case 'refresh_token':
                payload = await handler.getRefreshToken({
                    clientId: params.clientId,
                    clientSecret: params.clientSecret,
                    refreshToken: params.refreshToken,
                    userAgent: params.userAgent,
                    grantType: params.grantType,
                    flow: params.flow,
                    row: src.state
                });

                break;

            case 'client_credentials':
                payload = await authorizationService.getClientCredentials({
                    clientId: params.clientId,
                    clientSecret: params.clientSecret,
                    scope: params.scope,
                    userAgent: params.userAgent,
                    flow: params.flow,
                    row: src.state
                });
                break;

            case 'password':
                payload = await authorizationService.getROPCredentials({
                    clientId: params.clientId,
                    clientSecret: params.clientSecret,
                    username: params.username,
                    password: params.password,
                    scope: params.scope,
                    userAgent: params.userAgent,
                    flow: params.flow,
                    row: src.state
                });
                break;

            default:
                payload = 0;
                break;
        }
        if (payload) {
            res.json(payload);
        } else {
            (req?.session?.destroy instanceof Function) && req.session.destroy();
            return res.status(401).json({
                "error": "unauthorized_client",
            });
        }
    }

    revoke(req, res) {
        res.json({
            action: "revoke",
            method: req.method,
            query: req.query,
            body: req.body
        });

    }

    revokeBack(req, res) {
        res.json({
            action: "revokeBack",
            method: req.method,
            query: req.query,
            body: req.body
        });
    }

    /**
     * @description extract all authentication parameters from request
     * @param {Object} req 
     * @param {Object} res 
     * @returns {clientId:String, clientSecret:String, username:String, password:String, codeChallenge:String, codeChallengeMethod:String, redirectUri:String, refreshToken:String, grantType:String, scope:String, state:String, code:String, userAgent}
     */
    getAuthData(req) {
        const payload = ksmf.app.Utl.self().mixReq(req);
        const token = req?.headers?.authorization;
        const credp = token ? kscryp.decode(token, 'basic') : {};
        const res = { flow: req.flow || payload.flow || Date.now() + "00" };
        req.flow = res.flow;

        (payload?.client_id || credp?.key) && (res.clientId = payload?.client_id || credp?.key);
        (payload?.client_secret || credp?.code) && (res.clientSecret = payload?.client_secret || credp?.code);
        (payload?.username) && (res.username = payload.username);
        (payload?.password) && (res.password = payload.password);
        (payload?.code_challenge) && (res.codeChallenge = payload.code_challenge);
        (payload?.code_challenge_method) && (res.codeChallengeMethod = payload.code_challenge_method);
        (payload?.redirect_uri) && (res.redirectUri = payload.redirect_uri);
        (payload?.refresh_token) && (res.refreshToken = payload.refresh_token);
        (payload?.grant_type) && (res.grantType = payload.grant_type);
        (payload?.response_type) && (res.responseType = payload.responseType);
        (payload?.scope) && (res.scope = payload.scope);
        (payload?.state) && (res.state = payload.state);
        (payload?.code) && (res.code = payload.code);

        (req?.headers['user-agent']) && (res.userAgent = req.headers['user-agent']);
        (payload?.affiliate) && (res.affiliate = payload.affiliate);
        (payload?.domain) && (res.domain = payload.domain);
        (payload?.flow_init) && (res.flowInit = payload.flow_init);
        (payload?.user_id) && (res.userId = payload.user_id);
        return res;
    }

    /**
     * @description safe search for payload
     * @param {Object} filter 
     * @param {Object} options 
     * @returns {Object} {user:Object, credential:Object, domain:Object, flow:String}
     */
    async search(filter, options) {
        const { mode = this.srvUser?.constant?.quantity?.one, flow } = options || {};
        try {
            const [user, credential, domain] = await Promise.all([
                filter.userId ? this.srvUser.select({ query: filter.userId, mode }, { flow }) : Promise.resolve(null),
                filter?.credentialId ? this.srvCredential.select({
                    query: filter.credentialId,
                    include: {
                        model: this.srvCredential?.dao?.models?.credentialState,
                        as: 'states',
                        where: filter,
                        required: false
                    },
                    mode
                }, { flow }) : Promise.resolve(null),
                filter?.domainId ? this.srvDomain.select({
                    query: filter.domainId, mode
                }, { flow }) : Promise.resolve(null),
            ]);
            this.logger?.info({
                flow: options?.flow,
                src: "service:Authorization:search",
                data: {
                    result: { userId: user?.userId, credentialId: credential?.id, domainId: domain?.id },
                    filter,
                    options
                }
            });
            return { user, credential, domain, flow };
        }
        catch (error) {
            this.logger?.error && logger.error({
                flow: options?.flow,
                src: "service:Authorization:search",
                message: error?.message || error,
                data: {
                    filter,
                    options
                }
            });
            return null;
        }
    }
}

module.exports = OauthController;