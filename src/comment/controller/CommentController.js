/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * */
const KsMf = require('ksmf');
class CommentController extends KsMf.app.Controller {

    async init() {
        //... Define logger service as global for his controller
        this.logger = this.helper.get('logger');
        //... Define user service as global for his controller
        this.srv = this.helper.get({
            name: 'CommentService',
            path: 'service',
            module: this.module,
            dependency: {
                dao: 'dao',
                helper: 'helper'
            }
        });
    }

    async list(req, res) {
        const page = req.query.page;
        const size = req.query.size;
        const data = await await this.srv.configure().list(page, size);
        res.json(data);
    }

    async select(req, res) {
        const id = req.params['id'];
        const data = await this.srv.configure().select(id);
        res.json(data);
    }

    async insert(req, res) {
        const payload = req.body;
        const data = await this.srv.save(payload);
        this.logger.prefix('Comment.Controller').info('INSERT', data);
        res.json(data);
    }

    async update(req, res) {
        const payload = req.body;
        payload.id = payload.id || req.params['id'];
        const data = await this.srv.update(payload);
        this.logger.prefix('Comment.Controller').info('UPDATE', data);
        res.json(data);
    }

    async delete(req, res) {
        const id = req.params['id'];
        const data = await this.srv.delete(id);
        this.logger.prefix('Comment.Controller').info('DELETE', data);
        res.json(data);
    }
}

module.exports = CommentController;