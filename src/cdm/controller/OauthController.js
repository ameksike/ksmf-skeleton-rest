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
        const domainId = (params.state || "").trim().split(" ")[0];
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
        this.srvCredential.generate(opt, { user_agent: req.headers['user-agent'], strict: true });
        const credential = await this.srvCredential.save({
            data: params,
            where: { clientId: params.clientId },
            mode: this.srvCredential?.constant?.action?.write
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
                status: this.srvCredentialState.constant.status.activated,
                note: "STEP 1: init"
            },
            where: {
                flow,
                domainId: domain.id
            },
            mode: this.srvCredentialState.constant.action.create
        });
        const token = this.encode({ flow, domain, credential });

        // proceed with the authentication
        return handler?.authorize(req, res, { domain, credential, token, flow });
    }

    authorizeBack(req, res) {
        const params = ksmf.app.Utl.self().mixReq(req);
        const { state, code, scope } = params;


        res.json({
            action: "authorizeBack",
            method: req.method,
            query: req.query,
            body: req.body
        });

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
        const { domain, credential, user, flow } = payload || {};
        return kscryp.encode({
            flow: flow || Date.now(),
            userId: user?.id,
            domain: domain?.id,
            credential: credential?.id
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
        (payload?.headers['user-agent']) && (res.userAgent = payload.headers['user-agent']);
        (payload?.affiliate) && (res.affiliate = payload.affiliate);
        return res;
    }
}

module.exports = OauthController;