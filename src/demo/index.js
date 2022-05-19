/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/03/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');

class DemoModule extends KsMf.app.Module {

    initConfig() {
        const prefix = "/api/v1" + this.prefix;
        this.routes = [{
            route: prefix + "/",
            controller: 'DefaultController',
            method: 'rest'
        }, {
            route: prefix + "/reasons/:id",
            controller: 'DefaultController',
            action: 'select',
            method: 'get'
        }, {
            route: prefix + "/reasons/:id",
            controller: 'DefaultController',
            action: 'update',
            method: 'put'
        }];
    }
}
module.exports = DemoModule;