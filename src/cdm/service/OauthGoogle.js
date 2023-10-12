/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * @requires    OauthService
 **/

const OauthService = require("./OauthService");

class OauthGoogle extends OauthService {
    /**
     * @description STEP 1: Request the IDP authorization 
     * @param {Object} payload 
     * @param {Object} req 
     * @param {Object} res 
     * @override
     */
    authorize(payload, req, res) {
        req.query.scope = req.query.scope || "profile";
        return super.authorize(payload, req, res);
    }
}

module.exports = OauthGoogle;