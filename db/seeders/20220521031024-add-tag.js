'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tags', [
      { name: 'Critics' },
      { name: 'Suggestions' },
      { name: 'Complaints' },
      { name: 'Dissertations' },
      { name: 'Claims' },
      { name: 'Improvements' },
      { name: 'Control' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {});
  }
};
