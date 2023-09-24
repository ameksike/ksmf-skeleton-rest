/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 **/

const ksmf = require('ksmf');
class CredentialService extends ksmf.dao.DataService {

    constructor(config) {
        super(config);
        this.modelName = 'Credential';
    }
}

module.exports = CredentialService;