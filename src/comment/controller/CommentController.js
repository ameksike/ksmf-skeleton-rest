/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 **/
const commentValidator = require('../validator/Comment');
const KsMf = require('ksmf');

class CommentController extends KsMf.dao.DataController {
    constructor() {
        super(...arguments);
        this.srvName = 'CommentService';
    }

    /**
     * @description define groups of validations based on a certain action
     */
    initValidations() {
        this.middleware.insert = commentValidator.all;
        this.middleware.update = commentValidator.optional;
    }
}

module.exports = CommentController;