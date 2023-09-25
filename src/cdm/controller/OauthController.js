const ksmf = require("ksmf");
const ioc = require("../cfg/ioc.json")

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
    }

    async authorize(req, res) {
        const params = ksmf.app.Utl.self().mixReq(req);
        const domainId = (params.state || "").trim().split(" ")[0];
        const flow = req.flow;

        const domain = await this.srvDomain.select({
            where: {
                id: domainId
            },
            limit: 1
        });

        if (!domain) {
            return res.status(400).json({
                error: "Bad request"
            })
        }

        const handler = this.getHandler({ domain, flow });

        if (!handler?.authorize) {
            return res.status(400).json({
                error: "Bad domain"
            })
        }

        handler?.inject instanceof Function && handler.inject({
            srvDomain: this.srvDomain,
            srvCredential: this.srvCredential,
            srvCredentialState: this.srvCredentialState
        });

        const credentialState = await this.srvCredentialState.save({
            data: {
                flow,
                domainId: domain.id,
                status: this.srvCredentialState.constant.status.activated
            },
            where: {
                flow,
                domainId: domain.id
            },
            mode: this.srvCredentialState.constant.action.create
        });

        return handler?.authorize(req, res, { domain, flow });
    }

    authorizeBack(req, res) {
        const params = ksmf.app.Utl.self().mixReq(req);
        const { state, code, scope } = params;

        authorizeBack
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
}

module.exports = OauthController;