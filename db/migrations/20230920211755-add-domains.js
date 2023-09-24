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
        type: Sequelize.INTEGER
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
      scope: {
        type: Sequelize.TEXT
      },
      state: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.INTEGER
      },
      metadata: {
        type: Sequelize.TEXT
      },
      note: {
        type: Sequelize.TEXT
      },
      secret: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('CredentialStates');
  }
};