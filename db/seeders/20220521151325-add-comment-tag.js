'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tagComments', [
      { commentId: 1, tagId: 1, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { commentId: 1, tagId: 2, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { commentId: 1, tagId: 3, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { commentId: 2, tagId: 3, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { commentId: 3, tagId: 1, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
      { commentId: 3, tagId: 3, createdAt: '2022-01-25', updatedAt: '2022-01-25' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tagComments', null, {});
  }
};