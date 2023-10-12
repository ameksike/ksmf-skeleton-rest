'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      documentId: {
        type: Sequelize.STRING
      },
      documentType: {
        type: Sequelize.STRING
      },
      documentCountry: {
        type: Sequelize.STRING
      },
      documentExpedition: {
        type: Sequelize.DATE
      },
      documentExpiration: {
        type: Sequelize.DATE
      },
      age: {
        type: Sequelize.INTEGER
      },
      sex: {
        type: Sequelize.STRING(1)
      },
      phone: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      lang: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      postal: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.TEXT
      },
      job: {
        defaultValue: 'None',
        type: Sequelize.STRING
      },
      createdAt: {
        defaultValue: Sequelize.literal("NOW()"),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};