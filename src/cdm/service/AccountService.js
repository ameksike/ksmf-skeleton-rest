/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		21/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * @requires    Dip
 * @requires    srvCredential
 * @requires    srvUser
 * @requires    enum
 **/

const ksdp = require('ksdp');
const enums = require('../cfg/enum.json');

class AccountService extends ksdp.integration.Dip {

    /**
     * @description user account registration
     * @param {Object} payload 
     * @param {Object} payload.state
     * @param {Object} payload.profile
     * @param {String} payload.flow 
     * @returns {Object} user
     */
    async register(payload) {
        const { state, profile, flow } = payload || {};
        if (!profile) {
            this.logger?.error({
                flow,
                src: "cdm:service:Account",
                message: "There is no valid profile",
                data: {
                    stateId: state?.id,
                    profile
                }
            });
            return null;
        }
        const metadata = Object.assign({}, state.metadata || {}, profile);
        state.update({ metadata });
        const account = this.serialize(payload);
        const clientId = state?.Domain?.id + ":" + account.id;

        // serach or create the credential
        const credential = await this.srvCredential.save({
            data: {
                clientId,
                type: enums.type.external,
                userId: state.userId,
                avatar: account.avatar
            },
            where: {
                type: enums.type.external,
                clientId
            },
            include: [{
                model: this.srvCredential.dao.models.User,
                as: 'owner'
            }],
            mode: this.srvCredential.constant.action.create
        });

        // verify credential
        if (!credential) {
            this.logger?.error({
                flow,
                src: "cdm:service:Account",
                message: "There is no valid credential",
                data: {
                    stateId: state?.id,
                    profile,
                    account
                }
            });
            return null;
        }

        // create the user account if it does not exist
        let user = credential.owner;
        if (!user) {
            delete account["id"];
            user = await this.srvUser.save({
                data: account,
                mode: this.srvUser.constant.action.create
            });
        }
        await state.update({ userId: user.id });

        // get the user account
        return user;
    }

    /**
     * @description serialize user account based on domain configuration
     * @param {Object} payload 
     * @param {Object} payload.state
     * @param {Object} payload.profile
     * @param {String} payload.flow 
     * @returns {Object} user
     */
    serialize(payload) {
        const { state, profile } = payload || {};
        const map = state?.Domain?.idpMapAttr;
        if (!map) {
            return profile;
        }
        const account = {};
        for (let i in map) {
            profile[i] && map[i] && (account[map[i]] = profile[i]);
        }
        return account;
    }
}

module.exports = AccountService;