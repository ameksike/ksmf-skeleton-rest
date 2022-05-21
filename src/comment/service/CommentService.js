/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * */

const CrudService = require('../../app/service/CrudService');

class CommentService extends CrudService {

    /**
     * @description initialize the service avoiding human error in inheritance management
     */
    init() {
        this.table = 'comment';
        this.configure();
    }

    /**
     * @description define dependencies to include for data selection operations,
     *              for more information regarding relationships between entities see the following link:
     *              https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
     */
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
        return this;
    }
}

module.exports = CommentService;