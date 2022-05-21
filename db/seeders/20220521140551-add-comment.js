'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comments', [
      { comment: 'My first comment', flightId: 666, userId: 1, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { comment: 'My second comment', flightId: 666, userId: 1, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { comment: 'My third comment', flightId: 333, userId: 1, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { comment: 'My fourth comment', flightId: 222, userId: 1, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { comment: 'My fifth comment', flightId: 111, userId: 2, createdAt: '2022-01-25', updatedAt: '2022-01-25' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};