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

    async list(req, res) {
        const page = req.query.page;
        const size = req.query.size;
        const filter = this.getObj(req.query, 'filter');
        const sort = this.getObj(req.query, 'sort');
        const data = await await this.srv.list(page, size, filter, sort);
        res.json(data);
    }

    async select(req, res) {
        const id = req.params['id'];
        const data = await this.srv.select(id);
        res.json(data);
    }

    async insert(req, res) {
        const payload = req.body;
        const data = await this.srv.save(payload);
        this.logger.prefix('User.Controller').info('INSERT', data);
        res.json(data);
    }

    async update(req, res) {
        const payload = req.body;
        payload.id = payload.id || req.params['id'];
        const data = await this.srv.update(payload);
        this.logger.prefix('User.Controller').info('UPDATE', data);
        res.json(data);
    }

    async delete(req, res) {
        const id = req.params['id'];
        const data = await this.srv.delete(id);
        this.logger.prefix('User.Controller').info('DELETE', data);
        res.json(data);
    }
}

module.exports = DefaultController;