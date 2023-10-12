'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [
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
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
