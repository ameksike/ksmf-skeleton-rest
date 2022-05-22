'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tags', [
      { name: 'Críticos' },
      { name: 'Históricos' },
      { name: 'Literarios' },
      { name: 'Disertaciones' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {});
  }
};
