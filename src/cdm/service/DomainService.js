/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * @requires    DataService
 **/

const ksmf = require('ksmf');
class DomainService extends ksmf.dao.DataService {

    constructor(config) {
        super(config);
        this.modelName = 'Domain';
    }

    init() {
        this.modelName = this.opt?.model[this.modelName] || this.modelName;
    }
}

module.exports = DomainService;