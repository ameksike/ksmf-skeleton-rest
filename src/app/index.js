/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
const path = require('path');

class AppModule extends KsMf.app.Module {
    async initApp() {
        const app = this.helper.get('app');
        const web = app.web;
        function redirect(req, res) {
            if (app.cfg && app.cfg.srv && app.cfg.srv.doc && app.cfg.srv.doc.url) {
                res.writeHead(302, {
                    location: app.cfg.srv.doc.url,
                });
                res.end();
            } else {
                res.end('API v1.0.0');
            }
        }
        web.get('/', (req, res) => {
            redirect(req, res);
        });
    }
}
module.exports = AppModule;