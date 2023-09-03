/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 **/
const ksmf = require('ksmf');

class CommentService extends ksmf.dao.DataService {
    /**
     * @description initialize the service avoiding human error in inheritance management
     */
    constructor(config) {
        super(config);
        this.modelName = 'Comment';
    }

    getInclude() {
        return [{
            required: false,
            attributes: ["name"],
            model: this.dao.models.Tag,
            includes: {
                model: this.dao.models.TagComment,
                attributes: [],
                required: false
            }
        },{
            model: this.dao.models.User
        }];
    }

    select(payload) {
        payload.attributes = payload.attributes || ["id", "comment", "date"];
        return super.select(payload);
    }

    /**
     * @description define dependencies to include for data selection operations,
     *              for more information regarding relationships between entities see the following link:
     *              https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
     */
    setTags(comment, payload) {
        if (comment && payload.tags && payload.tags instanceof Array) {
            return comment.setTags(payload.tags);
        }
    }

    async save(payload) {
        const comment = await super.save(payload);
        await this.setTags(comment, payload.data);
        return comment;
    }
}

module.exports = CommentService;