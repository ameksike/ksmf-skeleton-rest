/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/03/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * @require     axios
 * */
const axios = require('axios');
class MyAPI {

    constructor() {
        this.token = '';
        this.base = process.env.MyAPI_URL;
    }

    /**
     * @description set configuration options 
     * @param {OBJECT} data 
     * @param {STRING} data.token 
     */
    set(data) {
        this.token = data && data.token ? data.token : this.token;
        return this;
    }

    /**
     * 
     * @param {OBJECT} options 
     * @param {OBJECT} options.headers
     * @param {STRING} options.url 
     * @param {STRING} options.method 
     * @param {OBJECT} options.data 
     */
    async req(options) {
        options = options || {};
        const headers = Object.assign({
            'Authorization': this.token
        }, options.headers || {});
        const opt = {
            headers,
            url: this.base + options.url,
            method: options.method || 'post',
            data: options.data || {}
        }
        try {
            const result = await axios(opt);
            return {
                data: result.data
            };
        } catch (error) {
            return {
                error: error.message || error
            }
        }
    }

    /**
     * 
     * @param {OBJECT} payload 
     * @param {STRING} payload.client_id 
     * @param {STRING} payload.client_secret 
     * @param {STRING} payload.redirect_uri 
     * @param {STRING} payload.code_verifier
     * @param {STRING} payload.scope 
     * @param {STRING} payload.code 
     * @return {OBJECT} {
     *      data: {
     *          token: STRING
     *      }
     * } 
     */
     async getAuthorization(payload) {
        //... confifure options for get authorization code
        const data = {
            grant_type: "authorization_code",
            ...payload
        };
        return await this.req({
            url: "/api/v2/access/authorize",
            method: 'post',
            data
        });
    }

    /**
     * @description get user list 
     * @param {NUMBER} offset 
     * @param {NUMBER} limit 
     * @param {STRING} criteria 
     * @return {OBJECT} {
            "page": 2,
            "per_page": 6,
            "total": 12,
            "total_pages": 2,
            "data": [{
                "id": 7,
                "email": "michael.lawson@reqres.in",
                "first_name": "Michael",
                "last_name": "Lawson",
                "avatar": "https://reqres.in/img/faces/7-image.jpg"
            }]
     */
    async getUsers(offset = 0, limit = 10, criteria = '') {
        return await this.req({
            url: `/api/users?page=${offset}`,
            method: 'get'
        });
    }

    /**
     * @description create user
     * @param {OBJECT} data 
     * @param {NUMBER} data.age 
     * @param {STRING} data.name 
     * @param {STRING} data.job
     * @returns {OBJECT} {
            "name": "morpheus",
            "job": "leader",
            "id": "629",
            "createdAt": "2022-05-19T03:08:32.718Z"
        }
     */
    async setUser(data) {
        return await this.req({
            url: "/api/users",
            method: 'post',
            data
        });
    }
}

module.exports = MyAPI;