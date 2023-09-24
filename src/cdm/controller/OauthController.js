const ksmf = require("ksmf");
const ioc = require("../cfg/ioc.json")

class OauthController {

    getHandler({ domain }) {
        const handler = domain?.name && this.helper.get("cdm.service." + domain?.name);
        if (handler?.cls !== null) {
            return handler;
        }
        return this.helper.get("cdm.service." + domain?.idpType);
    }

    async init() {
        this.helper.configure({ src: ioc });
        this.logger = this.helper.get('logger');

        this.srvDomain = this.helper.get("cdm.service.Domain");
        this.srvCredential = this.helper.get("cdm.service.Credential");
    }

    async authorize(req, res) {
        const params = ksmf.app.Utl.self().mixReq(req);
        const domainId = (params.state || "").trim().split(" ")[0];

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

        const handler = this.getHandler({ domain });

        return handler.authorize(req, res, { domain, flow: req.flow });
    }

    authorizeBack(req, res) {
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