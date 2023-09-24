/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
class DomainController extends KsMf.dao.DataController {

    constructor() {
        super(...arguments);
        this.srvName = 'DomainService';
    }

    /**
     * @description define groups of validations based on a certain action
     */
    initValidations() {
    }
}

module.exports = DomainController;