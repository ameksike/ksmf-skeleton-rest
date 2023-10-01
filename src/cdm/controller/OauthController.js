const ksmf = require("ksmf");
const ioc = require("../cfg/ioc.json");
const kscryp = require('kscryp');

class OauthController {

    getHandler({ domain }) {
        const handler = domain?.name && this.helper.get("cdm.service." + domain?.name);
        if (handler) {
            return handler;
        }
        return this.helper.get("cdm.service." + domain?.idpType);
    }

    async init() {
        this.helper.configure({ src: ioc });
        this.logger = this.helper.get('logger');

        this.srvDomain = this.helper.get("cdm.service.Domain");
        this.srvCredential = this.helper.get("cdm.service.Credential");
        this.srvCredentialState = this.helper.get("cdm.service.CredentialState");
        this.srvAccount = this.helper.get("cdm.service.Account");
    }

    async authorize(req, res) {
        const params = this.getAuthData(req);
        const domainId = parseInt(params.domain || (params.state || "").trim().split(" ")[0]);
        const flow = req.flow;

        // domain verification
        const domain = await this.srvDomain.select({
            where: {
                id: domainId
            },
            limit: 1
        });
        if (!domain) {
            return res.status(400).json({
                error: "Bad request"
            });
        }

        // Oauth handler verification
        const handler = this.getHandler({ domain, flow });
        if (!handler?.authorize) {
            return res.status(400).json({
                error: "Bad domain"
            });
        }
        handler?.inject instanceof Function && handler.inject({ srvAccount: this.srvAccount });

        // credential verification
        this.srvCredential.generate(params, { user_agent: req.headers['user-agent'], strict: true });
        const credential = await this.srvCredential.save({
            data: params,
            where: { clientId: params.clientId },
            mode: domain.asUserAction
        });
        if (!credential) {
            return res.status(400).json({
                error: "Bad credential"
            });
        }

        // credential state tracking
        const credentialState = await this.srvCredentialState.save({
            data: {
                flow: parseInt(flow),
                domainId: domain.id,
                credentialId: credential?.id || null,
                status: 1,
                state: params.state,
                scope: params.scope,
                redirectUri: params.redirectUri,
                note: "STEP 1: init"
            },
            where: {
                flow,
                domainId: domain.id
            },
            mode: this.srvCredentialState.constant.action.create
        });
        const token = this.encode({ flow, domain, credential, affiliate });

        // proceed with the authentication
        return handler?.authorize(req, res, { domain, credential, token, flow });
    }

    async authorizeBack(req, res) {
        let params = ksmf.app.Utl.self().mixReq(req);
        let { state, code, scope, flow } = params;
        let payload = this.decode(state);
        let flowInit = flow;
        flow = payload.flow || flow;

        const credentialState = await this.srvCredentialState.select({
            where: { flow },
            limit: 1
        });

        this.logger?.info({
            flow,
            src: "Controller:OAuth:Authorize:Back",
            flow_init: flowInit,
            data: params
        });

        // domain verification
        if (!credentialState?.domain) {
            return res.status(400).json({
                error: "Bad request"
            });
        }
        // credential verification
        if (!credentialState?.credential) {
            return res.status(400).json({
                error: "Bad request"
            });
        }

        const handler = this.getHandler({ domain, flow });

        return handler.authorizeBack(req, res, { domain, credential, flow, code, scope });
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

    token(req, res) {
        res.json({
            action: "token",
            method: req.method,
            query: req.query,
            body: req.body
        });

    }

    encode(payload) {
        const { domain, credential, user, affiliate, flow } = payload || {};
        return kscryp.encode({
            flow: flow || Date.now(),
            userId: user?.id,
            domainId: domain?.id,
            credentialId: credential?.id,
            affiliateId: affiliate?.id || affiliate
        }, "jwt");
    }

    decode(payload) {
        const { code } = payload || {};
        return kscryp.decode(code, "jwt");
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
        const res = {};
        (payload?.client_id || credp?.key) && (res.clientId = payload?.client_id || credp?.key);
        (payload?.client_secret || credp?.code) && (res.clientSecret = payload?.client_secret || credp?.code);
        (payload?.username) && (res.username = payload.username);
        (payload?.password) && (res.password = payload.password);
        (payload?.code_challenge) && (res.codeChallenge = payload.code_challenge);
        (payload?.code_challenge_method) && (res.codeChallengeMethod = payload.code_challenge_method);
        (payload?.redirect_uri) && (res.redirectUri = payload.redirect_uri);
        (payload?.refresh_token) && (res.refreshToken = payload.refresh_token);
        (payload?.grant_type) && (res.grantType = payload.grant_type || "code");
        (payload?.scope) && (res.scope = payload.scope);
        (payload?.state) && (res.state = payload.state);
        (payload?.code) && (res.code = payload.code);
        (req?.headers['user-agent']) && (res.userAgent = req.headers['user-agent']);
        (payload?.affiliate) && (res.affiliate = payload.affiliate);
        (payload?.domain) && (res.domain = payload.domain);
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