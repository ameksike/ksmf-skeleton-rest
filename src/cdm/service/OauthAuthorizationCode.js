/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL 
 * @version    	1.0 
 **/
const ksdp = require('ksdp');
const ksmf = require('ksmf');
const axios = require('axios');
const kscryp = require('kscryp');

class OauthAuthorizationCode extends ksdp.integration.Dip {

    /**
     * @description STEP 1: Request the IDP authorization 
     * @param {Object} payload 
     * @param {Object} req 
     * @param {Object} res 
     */
    authorize(req, res, payload) {
        const uri = payload?.domain?.idpUrlEntry;
        const params = {
            client_id: payload?.domain?.idpId,
            redirect_uri: payload?.domain?.idpUrlEntryBack,
            scope: payload?.scope || "",
            state: this.encode({
                flow: req.flow,
                domain: payload?.domain,
                credential: payload?.credential
            }),
            response_type: "code"
        };
        const url = ksmf.app.Url.self().add(uri, params);
        return res.redirect(url);
    }

    /**
     * @description STEP 2: IDP authorization callback and request token
     * @param {Object} payload 
     * @param {Object} req 
     * @param {Object} res 
     */
    async authorizeBack(req, res, payload) {
        const reqParams = ksmf.app.Utl.self().mixReq(req);
        try {
            const { code, domain, credential, flow, state } = reqParams;
            const params = {
                code,
                client_id: domain?.idpId,
                client_secret: domain?.idpSecret,
                redirect_uri: domain?.idpUrlEntryBack,
                grant_type: 'authorization_code'
            };
            const response = await axios.post(domain?.idpUrlToken, null, { params });
            const profile = await this.getProfile({ domain, code: response?.data?.access_token, flow });
            const user = await this.register({ profile, state, flow });
            const token = await this.encode({ domain, credential, user, flow });
            return res.redirect(credential?.redirectUri);
        } catch (error) {
            this.logger?.error({
                flow: reqParams?.flow,
                src: "cdm:service:OauthAuthorizationCode",
                data: reqParams,
                error
            });
        }
    }

    encode(payload) {
        const { domain, credential, user, flow } = payload || {};
        return kscryp.encode({
            flow: flow || Date.now(),
            userId: user?.id,
            domain: domain?.id,
            credential: credential?.id
        }, "jwt");
    }

    decode(payload) {
        const { code } = payload || {};
        return kscryp.decode(code, "jwt");
    }

    async getProfile(payload) {
        const url = payload?.domain?.idpUrlProfile;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${payload?.token}`
                }
            });
            return response?.data;
        } catch (error) {
            this.logger?.error({
                flow: params?.flow,
                src: "cdm:service:getProfile",
                data: params,
                error
            });
        }
    }

    register(payload) {
        const { domain, credential, profile } = payload || {};
        
    }

    revoke(req, res, payload) {

    }

    revokeBack(req, res, payload) {

    }

    token(payload, req, res) {

    }
}

module.exports = OauthAuthorizationCode;