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
        const tagComentrelation = {
            model: tagComentModel,
            include: [{
                model: tagModel
            }]
        };
        if (tagModel && tagComentModel) {
            this.include = [{
                model: userModel
            }, {
                model: tagModel
            }];
        }
        return this;
    }

    setTags(comment, payload) {
        if (comment && payload.tags && payload.tags instanceof Array) {
            return comment.setTags(payload.tags);
        }
    }

    async save(payload) {
        const comment = await super.save(payload);
        const tags = await this.setTags(comment, payload);
        return comment;
    }

    async update(payload) {
        const comment = await super.update(payload);
        const tags = await this.setTags(comment, payload);
        return comment;
    }

}

module.exports = CommentService;