/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/03/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
class DefaultController extends KsMf.app.Controller {

    async init() {
        this.logger = this.helper.get('logger');
        this.service = this.helper.get('MyAPI');
        this.srvUser = this.helper.get({
            name: 'UserService',
            path: 'service',
            module: this.module,
            options: {
                opt: this.opt
            },
            dependency: {
                dao: 'dao',
                helper: 'helper'
            }
        });

        /**
         * If authentication is required:
         * this.token = await this.service.getAuthorization({
         *      client_id: process.env.MyAPI_CLIENT_ID,
         *      client_secret: process.env.MyAPI_CLIENT_SECRET
         * });
         */
    }

    /**
     * @description list data 
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     */
    async list(req, res) {
        this.logger.info('params', req.query);
        const {offset, limit, criteria} = req.query;
        
        /**
         * If authentication is required:
         * this.service.set({ token: req.token || this.token });
         */
        
        const result = await this.service.getUsers(offset || 0, limit || 10, criteria || '');

        if (result.error) {
            res.status(401).json({
                code: 'unauthorized',
                message: result.error.message
            });
        } else {
            res.json(result.data);
        }
    }

    async select(req, res, next) {
        const user = await this.srvUser.select(req.params.id);
        res.json({ "message": `REST API SELECT, ID:${req.params.id}.`, user });
    }

    delete(req, res, next) {
        res.json({ "message": `REST API DELETE, ID:${req.params.id}.` });
    }

    clean(req, res, next) {
        res.json({ "message": `REST API CLEAN.` });
    }

    update(req, res, next) {
        res.json({ "message": `REST API UPDATE, ID:${req.params.id}, name: ${req.body.name}.` });
    }

    async insert(req, res, next) {
        const payload = req.body;
        const data = await this.srvUser.insert(payload);
        this.logger.info('INSERT', data);
        res.json(data);
    }
}

module.exports = DefaultController;