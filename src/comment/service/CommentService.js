/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * */

const CrudService = require('../../app/service/CrudService');

class CommentService extends CrudService {

    init() {
        this.table = 'comment';
        this.configure();
    }

    configure() {
        const tagModel = this.dao.models['tag'];
        const tagComentModel = this.dao.models['tagComment'];
        const userModel = this.dao.models['user'];
        if (tagModel && tagComentModel) {
            this.include = [{
                model: tagComentModel,
                include: [{
                    model: tagModel
                }]
            }, {
                model: userModel
            }];
        }
    }
}

module.exports = CommentService;