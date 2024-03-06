const KsMf = require('ksmf');
class TstController extends KsMf.app.Controller {
    list(req, res, next) {
        let data = this.app?.server?.session?.select(req, "EST");
        this.app.server?.session?.create(req, "EST", {
            name: req.query.name || data?.name
        })
        let sess = this.app?.server?.session?.select(req, "EST");
        let lib = this.app.helper?.get({ name: "sequelize", type: "package" });
        res.json({ "message": `REST API <${this.opt.name}> LIST.`, sess, device: req.fingerprint });
    }
}

module.exports = TstController;