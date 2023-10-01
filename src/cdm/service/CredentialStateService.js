/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 **/

const ksmf = require('ksmf');
class CredentialStateService extends ksmf.dao.DataService {

    constructor(config) {
        super(config);
        this.modelName = 'CredentialState';
    }

    /**
     * @description format the include clause
     * @override
     * @param {Object|String|Number} include 
     * @param {Object|String|Number} where 
     * @returns {Object}
     */
    getInclude({ include, filter }) {
        if (!include && include !== undefined) {
            return null;
        }
        return [{
            required: false,
            model: this.dao.models.Domain
        }, {
            required: false,
            model: this.dao.models.Credential
        }, {
            required: false,
            model: this.dao.models.User
        }];
    }
}

module.exports = CredentialStateService;