/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');

class CommentModule extends KsMf.app.Module {

    initConfig() {
        const version = "/api/v1";
        this.routes = [{
            route: version + "/tag",
            controller: 'TagController',
            method: 'rest'
        }, {
            route: this.prefix + "/tst",
            controller: 'TstController',
            method: 'rest'
        }, {
            route: this.prefix + "/:commentId/tag",
            controller: 'TagController',
            method: 'rest'
        }, {
            route: this.prefix + "/",
            controller: 'CommentController',
            method: 'rest'
        }];
    }
}
module.exports = CommentModule;