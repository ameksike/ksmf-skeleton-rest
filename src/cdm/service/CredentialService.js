/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 **/

const ksmf = require('ksmf');
const kscryp = require('kscryp');
class CredentialService extends ksmf.dao.DataService {

    constructor(config) {
        super(config);
        this.modelName = 'Credential';
    }

    /**
     * @description generate id and secret for a credential
     * @param {Object} data 
     * @param {Object} opt 
     * @returns {Object} credential
     */
    generate(data, opt) {
        data = data || {};
        data.client_id = data.client_id || kscryp.encode(opt?.user_agent || Date.now() + Math.floor(Math.random() * 101), "hash", { algorithm: "md5" });
        data.client_secret = (data.client_secret || opt?.strict) ? data.client_secret : kscryp.encode(data.client_id + ":" + (data.product_id || Date.now()), "hash", { algorithm: "md5" });
        return data;
    }
}

module.exports = CredentialService;