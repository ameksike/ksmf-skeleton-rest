/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * */

const CrudService = require('../../app/service/CrudService');

class UserService extends CrudService {

    constructor(config) {
        super(config);
        this.table = 'user';
    }
}

module.exports = UserService;