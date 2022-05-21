/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		19/04/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * */
class CrudService {

    /**
     * @description initialize the service 
     */
    constructor(config) {
        this.dao = config ? config.dao : null;
        this.table = 'Crud';
        this.idField = 'id';
        this.include = [];
    }

    /**
     * @description list all entities 
     */
    async list(page = 0, size = 10) {
        const offset = page * size;
        const limit = size;
        if (!this.dao) return null;
        const model = this.dao.models[this.table];
        return await model.findAll({ offset, limit });
    }

    /**
     * @description insert an entity
     * @param {*} payload 
     */
    async insert(payload) {
        if (!this.dao) return null;
        try {
            const model = this.dao.models[this.table];
            return await model.create({
                ...payload
            });
        } catch (error) {
            const logger = this.getLogger();
            if (logger) {
                logger.prefix('CRUD.Service').error(error);
            }
            return null;
        }
    }

    /**
     * @description update an entity
     * @param {*} payload 
     */
    async update(payload) {
        if (!this.dao) return null;
        const model = this.dao.models[this.table];
        const Sequelize = this.dao.manager;
        let data = null;
        try {
            const where = {
                [this.idField]: {
                    [Sequelize.Op.eq]: payload[this.idField]
                }
            };
            const result = await model.update(payload, { where });
            if (result & result[0]) {
                data = await model.findOne({ where });
            }
            return result & result[0] ? data : null;
        } catch (error) {
            const logger = this.getLogger();
            if (logger) {
                logger.prefix('CRUD.Service').error(error);
            }
            return null;
        }
    }

    /**
     * @description delete an entity
     * @param {*} id 
     */
    async delete(id) {
        if (!this.dao) return null;
        const model = this.dao.models[this.table];
        try {
            const Sequelize = this.dao.manager;
            const data = await this.select(id);
            const result = await model.destroy({
                where: {
                    [this.idField]: {
                        [Sequelize.Op.eq]: id
                    }
                }
            });
            return result > 0 ? data : null;
        } catch (error) {
            const logger = this.getLogger();
            if (logger) {
                logger.prefix('CRUD.Service').error(error);
            }
            return {
                status: 'KO'
            };
        }
    }

    /**
     * @description get an entity
     * @param {*} value 
     * @param {*} field 
     */
    async select(value, field) {
        field = field || this.idField;
        const model = this.dao.models[this.table];
        const Sequelize = this.dao.manager;
        const where = {};
        if (value instanceof Array) {
            where[field] = {
                [Sequelize.Op.in]: value
            }
        } else {
            where[field] = {
                [Sequelize.Op.eq]: value.toString()
            }
        }
        const result = await model.findAll({ where });
        return value instanceof Array ? result : result[0];
    }

    /**
     * @description save an entity
     * @param {*} payload 
     */
    async save(payload) {
        if (!this.dao) return null;
        try {
            const model = this.dao.models[this.table];
            const Sequelize = this.dao.manager;
            const idField = payload[this.idField] || '';
            const where = {
                [this.idField]: {
                    [Sequelize.Op.eq]: idField
                }
            };
            const data = idField ? await model.findOne({ where }) : null;
            if (!data) {
                return await model.create(payload);
            } else {
                const result = await data.update(payload);
                return result & result[0] ? Object.assign(data, payload) : null;
            }
        } catch (error) {
            const logger = this.getLogger();
            if (logger) {
                logger.prefix('CRUD.Service').error(error);
            }
            return null;
        }
    }

    /**
     * @description Get Logger Object
     */
    getLogger() {
        if (!this.helper) {
            return null;
        }
        return this.helper.get('logger');
    }
}

module.exports = CrudService;
