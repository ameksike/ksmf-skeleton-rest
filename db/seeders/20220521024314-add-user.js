'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        age: 25,
        job: 'Developer',
        createdAt: '2022-01-25',
        updatedAt: '2022-01-25'
      }, {
        name: 'Mari Carmen',
        age: 15,
        job: 'Student',
        createdAt: '2022-01-25',
        updatedAt: '2022-01-25'
      }, {
        name: 'Lucy Light',
        age: 30,
        job: 'lawyer',
        createdAt: '2022-01-25',
        updatedAt: '2022-01-25'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
