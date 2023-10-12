/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * @requires    DataService
 * @requires    ksmf
 * @requires    kscryp
 **/

const ksmf = require('ksmf');
const kscryp = require('kscryp');
class CredentialService extends ksmf.dao.DataService {

    constructor(config) {
        super(config);
        this.modelName = 'Credential';
    }

    init() {
        this.modelName = this.opt?.model[this.modelName] || this.modelName;
    }

    /**
     * @description generate id and secret for a credential
     * @param {Object} data 
     * @param {Object} opt 
     * @returns {Object} credential
     */
    generate(data, opt) {
        data = data || {};
        data.clientId = data.clientId || kscryp.encode(data?.userAgent || Date.now() + Math.floor(Math.random() * 101), "hash", { algorithm: "md5" });
        data.clientSecret = (data.clientSecret || opt?.strict) ? data.clientSecret : kscryp.encode(data.clientId + ":" + (data.productId || Date.now()), "hash", { algorithm: "md5" });
        return data;
    }
}

module.exports = CredentialService;