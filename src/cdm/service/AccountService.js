/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 **/

const ksdp = require('ksdp');

class CredentialService extends ksdp.integration.Dip {

    register(payload) {
        const { domain, credential, profile } = payload || {};
        console.log(payload);
    }
}

module.exports = CredentialService;