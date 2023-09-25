const OauthAuthorizationCode = require("./OauthAuthorizationCode");

class Google extends OauthAuthorizationCode {
    /**
     * @description STEP 1: Request the IDP authorization 
     * @param {Object} payload 
     * @param {Object} req 
     * @param {Object} res 
     * @override
     */
    authorize(req, res, payload) {
        req.query.scope = req.query.scope || "profile";
        return super.authorize(req, res, payload);
    }

}

module.exports = Google;