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
        const app = this.helper.get('app').web;

        //...............................
        /*const swaggerUI = require('swagger-ui-express');
        const swaggerJsDoc = require('swagger-jsdoc');
        const config = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'My API',
                    description: 'Demo REST API',
                    contact: 'tonykssa@gmail.com',
                    version: '1.0.0'
                },
                servers: [{
                    url: "http://localhost:9000"
                }]
            },
            apis: [`${path.join(__dirname, '../user/controller/DefaultController.js')}`]
        };
        app.use(
            '/api/v1/doc',
            swaggerUI.serve,
            swaggerUI.setup(swaggerJsDoc(config))
        );*/
        //------------------------------
        /*app.get(/\/((?!(api)).)* /, (req, res) => {
            res.end('API v1.0.0');
        });*/
    }
}
module.exports = AppModule;