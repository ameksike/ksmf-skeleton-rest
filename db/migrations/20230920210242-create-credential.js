'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Credentials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.TEXT
      },
      clientSecret: {
        type: Sequelize.TEXT
      },
      metadata: {
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
      type: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Credentials');
  }
};