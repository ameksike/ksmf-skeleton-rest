'use strict';

const domains = [
  {
    name: "Google",
    lot: "social.media",
    description: "Google IDP",
    status: 1,
    idpUrlEntry: "https://accounts.google.com/o/oauth2/auth",
    idpUrlEntryBack: "http://localhost:3005/api/v1/cdm/oauth/authorize/idp/back",
    idpUrlToken: "https://oauth2.googleapis.com/token",
    idpUrlRevoke: "https://oauth2.googleapis.com/token?token={{token}}",
    idpUrlRevokeBack: "http://localhost:3005/api/v1/cdm/oauth/revoke/idp/back",
    idpUrlProfile: "https://www.googleapis.com/oauth2/v2/userinfo",
    idpId: "903347331590-svir5ddvmb3ei1mur0j6dmegecjikj1j.apps.googleusercontent.com",
    idpSecret: "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",
    idpType: "OauthAuthorizationCode",
    idpMapAttr: {
      "avatar": "picture",
      "name": "name",
      "firstName": "given_name",
      "lastName": "family_name",
      "id": "id",
      "email": "",
      "idm": "locale"
    },
    asType: "OauthAuthorizationCode",
    asUrlEntry: "http://localhost:3005/api/v1/cdm/oauth/authorize?domain=1",
    asUrlToken: "http://localhost:3005/api/v1/cdm/oauth/token",
    asUrlRevoke: "http://localhost:3005/api/v1/cdm/oauth/revoke",
    asUrlProfile: "http://localhost:3005/api/v1/cdm/oauth/profile",
    asUserAction: 4
  }, {
    name: "Facebook",
    lot: "social.media",
    description: "Facebook IDP",
    status: 1,
    idpUrlEntry: "https://www.facebook.com/v12.0/dialog/oauth",
    idpUrlEntryBack: "http://localhost:3005/api/v1/cdm/oauth/authorize/idp/back",
    idpUrlToken: "https://graph.facebook.com/v12.0/oauth/access_token",
    idpUrlRevoke: "https://graph.facebook.com/v12.0/{{clientId}}/permissions",
    idpUrlRevokeBack: "http://localhost:3005/api/v1/cdm/oauth/revoke/idp/back",
    idpUrlProfile: "https://graph.facebook.com/me",
    idpIdFormat: "id,name,email,picture,first_name,last_name,middle_name,name_format,birthday,gender,hometown,location,link,locale,timezone,verified,age_range",
    idpId: "834931227845955",
    idpSecret: "3e9fc3dec2e6d686f05bdcef1ec42c71",
    idpType: "OauthAuthorizationCode",
    idpMapAttr: {
      "avatar": "picture.data.url",
      "name": "name",
      "firstName": "first_name",
      "lastName": "last_name",
      "id": "",
      "email": "",
      "idm": ""
    },
    asType: "OauthAuthorizationCode",
    asUrlEntry: "http://localhost:3005/api/v1/cdm/oauth/authorize",
    asUrlToken: "http://localhost:3005/api/v1/cdm/oauth/token",
    asUrlRevoke: "http://localhost:3005/api/v1/cdm/oauth/revoke",
    asUrlProfile: "http://localhost:3005/api/v1/cdm/oauth/profile",
    asUserAction: 4
  }, {
    name: "Github",
    lot: "social.media",
    description: "Github IDP",
    status: 1,
    idpUrlEntry: "https://github.com/login/oauth/authorize",
    idpUrlEntryBack: "http://localhost:3005/api/v1/cdm/oauth/authorize/idp/back",
    idpUrlToken: "https://github.com/login/oauth/access_token",
    idpUrlRevoke: "https://api.github.com/applications/{{clientId}}/token",
    idpUrlRevokeBack: "http://localhost:3005/api/v1/cdm/oauth/revoke/idp/back",
    idpUrlProfile: "https://api.github.com/user",
    idpIdFormat: "",
    idpId: "Iv1.58d0c2313186de51",
    idpSecret: "dbc25de7227320a698fdee78306895b2a9552578",
    idpType: "OauthAuthorizationCode",
    idpMapAttr: {
      "avatar": "avatar_url",
      "name": "name",
      "firstName": "",
      "lastName": "",
      "id": "id",
      "email": "email",
      "idm": "location"
    },
    asType: "OauthAuthorizationCode",
    asUrlEntry: "http://localhost:3005/api/v1/cdm/oauth/authorize",
    asUrlToken: "http://localhost:3005/api/v1/cdm/oauth/token",
    asUrlRevoke: "http://localhost:3005/api/v1/cdm/oauth/revoke",
    asUrlProfile: "http://localhost:3005/api/v1/cdm/oauth/profile",
    asUserAction: 4
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = domains.map(itm => {
      itm.idpMapAttr = typeof itm.idpMapAttr !== "object" ? itm.idpMapAttr : JSON.stringify(itm.idpMapAttr);
      return itm;
    })
    await queryInterface.bulkInsert('Domains', data);
  },
  async down(queryInterface, Sequelize) {
    const names = domains.map(itm => "\"" + itm.name + "\"").join(",");
    await queryInterface.sequelize.query(`DELETE FROM api.Domains WHERE name IN (${names});`);
  }
};