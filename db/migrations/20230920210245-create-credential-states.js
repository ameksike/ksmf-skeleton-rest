'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CredentialStates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flow: {
        type: Sequelize.BIGINT
      },
      credentialId: {
        type: Sequelize.INTEGER
      },
      domainId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      affiliate: {
        type: Sequelize.INTEGER
      },
      userAgent: {
        type: Sequelize.TEXT
      },
      codeChallenge: {
        type: Sequelize.TEXT
      },
      codeChallengeMethod: {
        type: Sequelize.STRING
      },
      redirectUri: {
        type: Sequelize.TEXT
      },
      responseType: {
        type: Sequelize.STRING
      },
      scope: {
        type: Sequelize.TEXT
      },
      state: {
        type: Sequelize.TEXT
      },
      metadata: {
        type: Sequelize.TEXT
      },
      code: {
        type: Sequelize.TEXT
      },
      note: {
        type: Sequelize.TEXT
      },
      expirationTime: {
        type: Sequelize.TEXT
      },
      expirationSecret: {
        type: Sequelize.TEXT
      },
      refreshTime: {
        type: Sequelize.TEXT
      },
      refreshSecret: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CredentialStates');
  }
};