'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      { comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', flightId: 666, userId: 1, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', flightId: 666, userId: 1, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', flightId: 333, userId: 1, createdAt: '2022-01-25', updatedAt: '2022-01-15' },
      { comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', flightId: 222, userId: 1, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', flightId: 111, userId: 2, createdAt: '2022-01-25', updatedAt: '2022-01-23' },
      { comment: 'Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', flightId: 111, userId: 2, createdAt: '2022-01-25', updatedAt: '2022-02-25' },
      { comment: 'Tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident', flightId: 111, userId: 3, createdAt: '2022-01-25', updatedAt: '2022-02-25' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};