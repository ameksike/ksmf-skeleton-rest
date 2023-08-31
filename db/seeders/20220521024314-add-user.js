'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        job: 'Developer',
        createdAt: '2022-01-25',
        updatedAt: '2022-01-25'
      }, {
        firstName: 'Mari',
        lastName: 'Carmen',
        age: 15,
        job: 'Student',
        createdAt: '2022-01-25',
        updatedAt: '2022-01-25'
      }, {
        firstName: 'Lucy',
        lastName: 'Light',
        age: 30,
        job: 'lawyer',
        createdAt: '2022-01-25',
        updatedAt: '2022-01-25'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
