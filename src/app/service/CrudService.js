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
    async list(page = 1, size = 10, filter = null, sort = null) {
        if (!this.dao) return null;
        const model = this.dao.models[this.table];
        const offset = (page > 0 ? page - 1 : page) * size;
        const limit = size;
        return await model.findAll({
            offset,
            limit,
            where: this.asQuery(filter),
            order: this.asOrder(sort),
            include: this.include
        });
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
        const result = await model.findAll({ where, include: this.include });
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
     * @description get count of data from model
     * @param {OBJECT} options 
     * @param {STRING} options.col specify the column on which you want to call the count() method with the col
     * @param {BOOLEAN} options.distinct tell Sequelize to generate and execute a COUNT( DISTINCT( lastName ) ) query 
     * @returns {NUMBER}
     */
    async count(options = {}) {
        if (!this.dao) return null;
        try {
            const model = this.dao.models[this.table];
            return await model.count(options);
        } catch (error) {
            const logger = this.getLogger();
            if (logger) {
                logger.prefix('CRUD.Service').error(error);
            }
            return null;
        }
    }

    /**
     * @description get filters as query 
     *              see: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
     * @param {ARRAY} filter 
     */
    asQuery(filter) {
        if (!filter) return {};
        filter = typeof (filter) === 'string' ? JSON.parse(filter) : filter;
        const Sequelize = this.dao.manager;
        const model = this.dao.models[this.table];
        const where = {};
        for (let i in filter) {
            let [field, value, operator = 'eq'] = filter[i];
            if (model.hasOwnProperty(field)) {
                value = ['like', 'ilike'].includes((operator || '').toLowerCase()) ? '%' + value + '%' : value;
                if (Sequelize.Op[operator]) {
                    where[field] = {
                        [Sequelize.Op[operator]]: value
                    }
                }
            }
        }
        return where;
    }

    /**
     * @description get sort obtion as order format
     *              see: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#ordering-and-grouping
     * @param {ARRAY} sort 
     */
    asOrder(sort) {
        if (!sort) return [];
        const model = this.dao.models[this.table];
        const list = typeof (sort) === 'string' ? JSON.parse(sort) : sort;
        return list.filter(item => item && item[0] && model.hasOwnProperty(item[0]));
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
