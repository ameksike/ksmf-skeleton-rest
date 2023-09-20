'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Domains', {
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
      lot: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      idpIssuer: {
        type: Sequelize.STRING
      },
      idpUrlEntry: {
        type: Sequelize.TEXT
      },
      idpUrlLogin: {
        type: Sequelize.TEXT
      },
      idpUrlLogout: {
        type: Sequelize.TEXT
      },
      idpUrlFailure: {
        type: Sequelize.TEXT
      },
      idpMetadata: {
        type: Sequelize.TEXT
      },
      idpMapRole: {
        type: Sequelize.TEXT
      },
      idpMapAttr: {
        type: Sequelize.TEXT
      },
      idpType: {
        type: Sequelize.INTEGER
      },
      idpCert: {
        type: Sequelize.TEXT
      },
      asType: {
        type: Sequelize.STRING
      },
      idpIdFormat: {
        type: Sequelize.STRING
      },
      asUrlEntry: {
        type: Sequelize.TEXT
      },
      asUrlToken: {
        type: Sequelize.TEXT
      },
      asUrlRevoke: {
        type: Sequelize.TEXT
      },
      asUrlMetadata: {
        type: Sequelize.TEXT
      },
      asUrlProfile: {
        type: Sequelize.TEXT
      },
      asCert: {
        type: Sequelize.TEXT
      },
      asKey: {
        type: Sequelize.TEXT
      },
      asUserAction: {
        type: Sequelize.INTEGER
      },
      spVerify: {
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
    await queryInterface.dropTable('Domains');
  }
};