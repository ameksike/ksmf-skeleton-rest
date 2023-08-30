'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      document_id: {
        type: Sequelize.STRING
      },
      document_type: {
        type: Sequelize.STRING
      },
      document_country: {
        type: Sequelize.STRING
      },
      document_expedition: {
        type: Sequelize.DATE
      },
      document_expiration: {
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
    await queryInterface.dropTable('users');
  }
};