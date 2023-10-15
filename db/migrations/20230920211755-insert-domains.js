'use strict';

const domains = [
  {
    name: "Oauth Google",
    lot: "social.media",
    description: "Google IDP",
    status: 1,
    idpUrlEntry: "https://accounts.google.com/o/oauth2/auth",
    idpUrlEntryBack: "/api/v1/cdm/oauth/authorize/idp/back",
    idpUrlToken: "https://oauth2.googleapis.com/token",
    idpUrlRevoke: "https://oauth2.googleapis.com/token?token={{token}}",
    idpUrlRevokeBack: "/api/v1/cdm/oauth/revoke/idp/back",
    idpUrlProfile: "https://www.googleapis.com/oauth2/v2/userinfo",
    idpId: "903347331590-svir5ddvmb3ei1mur0j6dmegecjikj1j.apps.googleusercontent.com",
    idpSecret: "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",
    idpType: "OauthAuthorizationCode",
    idpMapAttr: {
      "id": "id",
      "given_name": "firstName",
      "family_name": "lastName",
      "picture": "avatar",
      "locale": "lang",
      "email": "email"
    },
    asType: "OauthAuthorizationCode",
    asUrlEntry: "/api/v1/cdm/oauth/authorize?domain=1",
    asUrlToken: "/api/v1/cdm/oauth/token",
    asUrlRevoke: "/api/v1/cdm/oauth/revoke",
    asUrlProfile: "/api/v1/cdm/oauth/profile",
    asUserAction: 4
  }, {
    name: "Oauth Facebook",
    lot: "social.media",
    description: "Facebook IDP",
    status: 1,
    idpUrlEntry: "https://www.facebook.com/v12.0/dialog/oauth",
    idpUrlEntryBack: "/api/v1/cdm/oauth/authorize/idp/back",
    idpUrlToken: "https://graph.facebook.com/v12.0/oauth/access_token",
    idpUrlRevoke: "https://graph.facebook.com/v12.0/{{clientId}}/permissions",
    idpUrlRevokeBack: "/api/v1/cdm/oauth/revoke/idp/back",
    idpUrlProfile: "https://graph.facebook.com/me",
    idpIdFormat: "id,name,email,picture,first_name,last_name,middle_name,name_format,birthday,gender,hometown,location,link,locale,timezone,verified,age_range",
    idpId: "834931227845955",
    idpSecret: "3e9fc3dec2e6d686f05bdcef1ec42c71",
    idpType: "OauthAuthorizationCode",
    idpMapAttr: {
      "id": "id",
      "userData.picture.data.url": "avatar",
      "first_name": "firstName",
      "last_name": "lastName",
      "email": "email"
    },
    asType: "OauthAuthorizationCode",
    asUrlEntry: "/api/v1/cdm/oauth/authorize",
    asUrlToken: "/api/v1/cdm/oauth/token",
    asUrlRevoke: "/api/v1/cdm/oauth/revoke",
    asUrlProfile: "/api/v1/cdm/oauth/profile",
    asUserAction: 4
  }, {
    name: "Oauth Github",
    lot: "social.media",
    description: "Github IDP",
    status: 1,
    idpUrlEntry: "https://github.com/login/oauth/authorize",
    idpUrlEntryBack: "/api/v1/cdm/oauth/authorize/idp/back",
    idpUrlToken: "https://github.com/login/oauth/access_token",
    idpUrlRevoke: "https://api.github.com/applications/{{clientId}}/token",
    idpUrlRevokeBack: "/api/v1/cdm/oauth/revoke/idp/back",
    idpUrlProfile: "https://api.github.com/user",
    idpIdFormat: "",
    idpId: "Iv1.58d0c2313186de51",
    idpSecret: "dbc25de7227320a698fdee78306895b2a9552578",
    idpType: "OauthAuthorizationCode",
    idpMapAttr: {
      "id": "id",
      "avatar_url": "avatar",
      "name": "firstName",
      "last_name": "lastName",
      "email": "email"
    },
    asType: "OauthAuthorizationCode",
    asUrlEntry: "/api/v1/cdm/oauth/authorize",
    asUrlToken: "/api/v1/cdm/oauth/token",
    asUrlRevoke: "/api/v1/cdm/oauth/revoke",
    asUrlProfile: "/api/v1/cdm/oauth/profile",
    asUserAction: 4
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {

    let url = process.env.SERVER_URI || "http://localhost:3005";
    let data = domains.map(itm => {
      itm.idpMapAttr = typeof itm.idpMapAttr !== "object" ? itm.idpMapAttr : JSON.stringify(itm.idpMapAttr);
      itm.asUrlEntry = url + itm.asUrlEntry;
      itm.asUrlToken = url + itm.asUrlToken;
      itm.asUrlRevoke = url + itm.asUrlRevoke;
      itm.asUrlProfile = url + itm.asUrlProfile;
      itm.idpUrlEntryBack = url + itm.idpUrlEntryBack;
      itm.idpUrlRevokeBack = url + itm.idpUrlRevokeBack;
      itm.createdAt = (new Date()).toISOString();
      itm.updatedAt = (new Date()).toISOString();
      return itm;
    });
    await queryInterface.bulkInsert('Domains', data);
  },
  async down(queryInterface, Sequelize) {
    const names = domains.map(itm => "\"" + itm.name + "\"").join(",");
    await queryInterface.sequelize.query(`DELETE FROM api.Domains WHERE name IN (${names});`);
  }
};