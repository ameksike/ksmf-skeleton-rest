/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
const ioc = require("./cfg/ioc.json");
class CdmModule extends KsMf.app.Module {

    initConfig() {
        //this.opt.cfg;
        this.helper.configure({ src: ioc });
        const prefix = "/api/v1" + this.prefix;
        this.routes = [{
            route: "/api/v1/user",
            controller: 'UserController',
            method: 'rest'
        }, {
            route: prefix + "/credential",
            controller: 'CredentialController',
            method: 'rest'
        }, {
            route: prefix + "/domain",
            controller: 'DomainController',
            method: 'rest'
        }, {
            route: prefix + "/oauth/authorize",
            controller: 'OauthController',
            action: 'authorize',
            method: 'get'
        }, {
            route: prefix + "/oauth/authorize/idp/back",
            controller: 'OauthController',
            action: 'authorizeBack',
            method: 'get'
        }, {
            route: prefix + "/oauth/authorize/idp/back",
            controller: 'OauthController',
            action: 'authorizeBack',
            method: 'post'
        }, {
            route: prefix + "/oauth/revoke",
            controller: 'OauthController',
            action: 'revoke',
            method: 'get'
        }, {
            route: prefix + "/oauth/revoke/idp/back",
            controller: 'OauthController',
            action: 'revokeBack',
            method: 'get'
        }, {
            route: prefix + "/oauth/revoke/idp/back",
            controller: 'OauthController',
            action: 'revokeBack',
            method: 'post'
        }, {
            route: prefix + "/oauth/token",
            controller: 'OauthController',
            action: 'token',
            method: 'post'
        }];

    }
}
module.exports = CdmModule;