/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
const userValidator = require('../validator/User');
class DefaultController extends KsMf.app.Controller {

    async init() {
        //... Define logger service as global for his controller
        this.logger = this.helper.get('logger');
        //... Define user service as global for his controller
        this.srv = this.helper.get({
            name: 'UserService',
            path: 'service',
            module: this.module,
            dependency: {
                dao: 'dao',
                helper: 'helper'
            }
        });
        this.initValidations();
        /**
         * If authentication is required:
         * this.token = await this.service.getAuthorization({
         *      client_id: process.env.MyAPI_CLIENT_ID,
         *      client_secret: process.env.MyAPI_CLIENT_SECRET
         * });
         */
    }

    /**
     * @description define groups of validations based on a certain action
     */
     initValidations() {
        this.middleware.insert = userValidator.all;
        this.middleware.update = userValidator.all;
    }

    /**
     * @description get safe JSON decode
     * @param {OBJECT} payload 
     * @param {STRING} key 
     * @returns 
     */
    getObj(payload, key) {
        try {
            return payload[key] ? JSON.parse(payload[key]) : null;
        }
        catch (error) {
            return null;
        }
    }

    /**
     * @description get the user list
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @returns {
     *  page: NUMBER,
     *  size: NUMBER,
     *  total: NUMBER,
     *  data: [USER]
     * }
     */
    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const filter = req.query.filter ? JSON.parse(req.query.filter) : "";
            const sort = req.query.sort ? JSON.parse(req.query.sort) : "";
            const data = await this.srv.list(page, req.query.size, filter, sort);
            const total = await this.srv.count(req.query.filter ? { where: this.srv.asQuery(filter) } : {});
            res.json({
                page,
                size: parseInt(req.query.size || total),
                total,
                filter,
                sort,
                data
            });
        }
        catch(error) {
            console.log(error)
        }
    }

    /**
     * @description get the user by id
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @returns {OBJECT} USER
     */
    async select(req, res) {
        const id = req.params['id'];
        const data = await this.srv.select(id);
        res.json(data);
    }

    /**
     * @description create new user
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @returns {OBJECT} USER
     */
    async insert(req, res) {
        const payload = req.body;
        const data = await this.srv.save(payload);
        this.logger?.info(data, payload);
        res.json(data);
    }
    
    /**
     * @description update user by id
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @returns {OBJECT} USER
     */
    async update(req, res) {
        const payload = req.body;
        payload.id = payload.id || req.params['id'];
        const data = await this.srv.update(payload);
        this.logger.prefix('User.Controller').info('UPDATE', data);
        res.json(data);
    }

    /**
     * @description delete user by id
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @returns {OBJECT} USER
     */
    async delete(req, res) {
        const id = req.params['id'];
        const data = await this.srv.delete(id);
        this.logger.prefix('User.Controller').info('DELETE', data);
        res.json(data);
    }
}

module.exports = DefaultController;