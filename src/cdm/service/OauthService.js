/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL 
 * @version    	1.0 
 * @requires    ksmf
 * @requires    axios
 * @requires    kscryp
 * @requires    ksdp
 **/
const ksdp = require('ksdp');
const ksmf = require('ksmf');
const axios = require('axios');
const kscryp = require('kscryp');

class OauthService extends ksdp.integration.Dip {

    constructor() {
        super();
        this.privateKey = process?.env?.TOKEN_SECRET || "AAccb0eea8a";
        this.expiresIn = process?.env?.TOKEN_EXPIRES || "30y";
    }

    /**
     * @description STEP 1: Request the IDP authorization 
     * @param {Object} payload 
     * @param {Object} req 
     * @param {Object} res 
     * @returns {Promise<String>} url
     */
    authorize(payload, req, res) {
        const { domain, scope, token } = payload;
        const uri = payload?.domain?.idpUrlEntry;
        const params = {
            client_id: domain?.idpId,
            redirect_uri: domain?.idpUrlEntryBack,
            scope: scope || req?.query?.scope || "",
            state: token || req?.query?.state || "",
            response_type: "code"
        };
        const url = ksmf.app.Url.self().add(uri, params);
        return Promise.resolve(url);
    }

    /**
     * @description STEP 2: IDP authorization callback and request token
     * @param {Object} payload 
     * @param {Object} payload.state
     * @param {Object} payload.domain 
     * @param {Object} payload.credential
     * @param {String} payload.code 
     * @param {String} payload.flow 
     * @param {Object} req 
     * @param {Object} res 
     * @returns {Promise<String>} url
     */
    async authorizeBack(payload, req, res) {
        try {
            const { domain, credential, flow, state } = payload;
            const response = await this.getIdpToken({ code: payload.code, domain, state });
            const profile = await this.getIdpProfile({ domain, sec: response, flow });
            const user = await this.srvAccount?.register({ profile, state, flow });
            const code = user ? await this.encode({ state: state?.id, flow }) : "";
            const url = ksmf.app.Url.self().add(state?.redirectUri || credential?.redirectUri, { code, state: state.state });
            return url;
        } catch (error) {
            this.logger?.error({
                flow: payload?.flow,
                src: "cdm:service:OauthAuthorizationCode",
                data: payload,
                message: error?.message || error
            });
            return "";
        }
    }

    revoke(payload, req, res) {

    }

    revokeBack(payload, req, res) {

    }

    /**
     * @description STEP 3: get access token: https://datatracker.ietf.org/doc/html/rfc6749#section-1.3.1
     * @param {Object} payload 
     * @param {Object} payload.row
     * @param {String} payload.code 
     * @param {String} payload.flow 
     * @param {Object} req 
     * @param {Object} res 
     * @returns {Promise<String>} url: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2 or https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
     */
    async getAuthorizationCode(payload, req, res) {
        const src = !!payload?.row && await this.extract(payload);
        const state = payload.row || src?.state;
        if (!state.User) {
            return null;
        }
        return this.getToken({
            state,
            flow: src?.flow || payload?.flow,
            flowInit: src?.flowInit
        });
    }

    /**
     * @description Refreshing an Access Token: https://datatracker.ietf.org/doc/html/rfc6749#section-6
     * @param {Object} payload 
     * @param {Object} req 
     * @param {Object} res 
     */
    getRefreshToken(payload, req, res) { }
    getClientCredentials(payload, req, res) { }

    /**
     * @description Resource Owner Password Credentials Grant based on the RFC6749
     * @param {Object} payload 
     * @param {String} payload.clientId
     * @param {String} payload.clientSecret
     * @param {String} payload.username
     * @param {String} payload.password
     * @param {String} payload.scope
     * @param {String} payload.userAgent
     * @param {String} payload.flow 
     */
    async getROPCredentials(payload, req, res) {
        const { clientId, clientSecret, username, password, scope, userAgent, flow } = payload;
        const [app, account] = await Promise.all([
            this.srvCredential.select({
                where: {
                    clientId,
                    clientSecret: kscryp.decode(clientSecret, "hash", { algorithm: "md5" }),
                    type: 2,
                    status: 1
                }
            }, { flow }),
            this.srvCredential.select({
                where: {
                    clientId: username,
                    clientSecret: kscryp.decode(password, "hash", { algorithm: "md5" }),
                    type: 1,
                    status: 1
                }
            }, { flow })
        ]);
        if (!app) {
            this.logger?.warn({
                flow,
                src: "cdm:OauthService:getROPCredentials",
                message: "There is no valid app credential",
                data: payload
            });
        }
        if (!account) {
            this.logger?.error({
                flow,
                src: "cdm:OauthService:getROPCredentials",
                message: "There is no valid user credential",
                data: payload
            });
            return null;
        }
        const state = await this.srvState.save({
            data: {
                credentialId: app?.id,
                userId: account?.User?.id,
                status: 3,
                note: "ROPCG success",
                scope,
                userAgent
            },
            mode: this.srvCredentialState.constant.action.write
        });
        return this.getToken({ state, flow });
    }

    /**
     * @description get IDP profile
     * @param {Object} payload 
     * @param {Object} payload.domain
     * @param {String} payload.sec.access_token
     * @param {String} payload.sec.expires_in
     * @param {String} payload.sec.token_type
     * @param {String} payload.sec.id_token
     * @param {String} payload.sec.scope
     * @param {String} payload.flow
     * @returns {Object} profile
     */
    async getIdpProfile(payload) {
        try {
            const url = payload?.domain?.idpUrlProfile || payload?.sec?.scope;
            const token = payload.sec.access_token;
            const tokenType = payload.sec.token_type;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `${tokenType} ${token}`
                }
            });
            return response?.data;
        } catch (error) {
            this.logger?.error({
                flow: payload?.flow,
                src: "cdm:service:getIdpProfile",
                data: {
                    idpUrlProfile: payload?.domain?.idpUrlProfile,
                    domainId: payload?.domain?.id,
                    sec: payload.sec
                },
                error
            });
            return null;
        }
    }

    /**
     * @description get external IDP access token
     * @param {Object} payload 
     * @param {Object} payload.state
     * @param {Object} payload.domain
     * @param {String} payload.code 
     * @returns {access_token:String}
     */
    async getIdpToken(payload) {
        const { code, domain, state } = payload;
        const params = {
            code: code || state.code,
            client_id: domain?.idpId,
            client_secret: domain?.idpSecret,
            redirect_uri: domain?.idpUrlEntryBack,
            grant_type: 'authorization_code'
        };
        const response = await axios.post(domain?.idpUrlToken, null, { params });
        return response?.data;
    }

    /**
     * @description Verify the authorization
     * @param {Object} state 
     * @param {Object} state.User 
     * @param {Object} state.Credential 
     * @param {Object} state.Domain 
     * @param {Object} option 
     * @returns {Boolean} result
     */
    verify(state, options = null) {
        if (!state.Credential || !state.Domain) {
            return false;
        }
        const alt = this.srvCredential.generate({
            clientId: options.clientId,
            clientSecret: options.clientSecret,
            userAgent: options.userAgent
        }, {
            strict: true
        });
        const altSecret = !options.clientSecret ? kscryp.encode(alt.clientSecret, "hash", { algorithm: "md5" }) : options.clientSecret;
        const same = alt.clientId === state.Credential.clientId && altSecret === state.Credential.clientSecret;
        if (!same) {
            this.logger?.warn({
                flow: options.flow,
                src: "cdm:service:Oauth:verify",
                data: {
                    clientSecret: altSecret === state.Credential.clientSecret,
                    clientId: alt.clientId === state.Credential.clientId,
                    clientIdOld: state.Credential.clientId,
                    clientIdNew: alt.clientId,
                }
            });
            if (state.Domain.spVerify) {
                return Promise.resolve(false);
            }
        }
        return Promise.resolve(true);
    }

    /**
     * @description get access token base on user, credential and domain: https://datatracker.ietf.org/doc/html/rfc6750#section-4
     * @param {{user, credential, domain}} src 
     * @returns {{access_token, refresh_token, token_type, expires_in, scope, state}}  https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
     */
    async getToken(src) {
        let { flow, state } = src || {};

        let access_token = kscryp.encode({
            stateId: state.id,
            type: 1
        }, "jwt", this.getOptAccess({ state }));

        let refresh_token = kscryp.encode({
            stateId: state.id,
            type: 2
        }, "jwt", this.getOptRefresh({ state }));

        let token = kscryp.decode(access_token, "jwt", this.getOptAccess({ state }));

        return {
            access_token,
            refresh_token,
            token_type: state?.responseType,
            expires_in: token.exp - token.iat,
            scope: state?.scope,
            state: state?.state,
            flow
        };
    }

    getOptAccess({ state }) {
        let expiresInAt = state?.expirationTime || process.env.TOKEN_ACCESS_EXPIRATION;
        let secretAt = state?.expirationSecret || "1-1";
        return {
            expiresIn: expiresInAt,
            privateKey: secretAt + (process.env.TOKEN_ACCESS_SECRET || "")
        }
    }

    getOptRefresh({ state }) {
        let expiresInRt = state?.refreshTime || process.env.TOKEN_REFRESH_EXPIRATION;
        let secretRt = state?.refreshSecret || "3-3";
        return {
            expiresIn: expiresInRt,
            privateKey: secretRt + (process.env.TOKEN_REFRESH_SECRET || "")
        }
    }

    /**
     * @description extract data from code
     * @param {Object} payload
     * @param {String} payload.code 
     * @param {String} payload.flow 
     * @param {String} payload.flowInit 
     * @returns {Promise<{state, flow, flowInit}>} 
     */
    async extract(payload) {
        const src = await this.decode(payload.code);
        const flowInit = payload.flow;
        payload.flow = src?.flow || flowInit;
        flowInit && (payload.flowInit = flowInit);

        const credentialState = await this.srvState.save({
            where: {
                id: src?.stateId || src?.state,
                flow: parseInt(payload.flow)
            },
            data: {
                status: 3,
                note: "STEP 3: Token generated"
            },
            mode: this.srvState.constant.action.update
        });

        if (!await this.verify(credentialState, payload)) {
            this.logger?.error({
                flow: payload.flow,
                src: "cdm:OauthService:getAuthorizationCode",
                message: "There is no valid credential",
                data: payload
            });
            return null;
        }

        return {
            state: credentialState,
            flow: payload.flow,
            flowInit
        };
    }

    encode(payload) {
        return payload ? kscryp.encode(payload, "jwt", {
            privateKey: this.privateKey,
            expiresIn: this.expiresIn
        }) : null;
    }

    decode(payload, key = "code") {
        const code = typeof payload === "string" ? payload : (payload || {})[key];
        return code ? kscryp.decode(code, "jwt", {
            privateKey: this.privateKey,
            expiresIn: this.expiresIn
        }) : null;
    }
}

module.exports = OauthService;