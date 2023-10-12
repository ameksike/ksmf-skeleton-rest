'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        documentId: "Y9907399J",
        documentType: "TIE",
        documentCountry: "Spain",
        documentExpedition: '2022-01-21',
        documentExpiration: '2022-01-29',
        sex: "M",
        phone: "+34669446888",
        email: "jon.doe@gmail.com",
        country: "Spain",
        nationality: "Andorra",
        city: "Andorra la Vella",
        address: "Plaça Príncep Benlloch, 1. AD500 Andorre-la-Vieille",
        postal: "08020",
        status: 1,
        age: 25,
        job: 'Developer',
        createdAt: '2022-01-25',
        updatedAt: '2022-01-25'
      }, {
        firstName: 'Mari',
        lastName: 'Carmen',
        age: 15,
        documentId: "L334353",
        documentType: "passport",
        documentCountry: "Spain",
        documentExpedition: '2022-01-21',
        documentExpiration: '2022-01-29',
        sex: "F",
        phone: "+34661236888",
        email: "mari.carmen@gmail.com",
        country: "Spain",
        nationality: "Andorra",
        city: "Andorra la Vella",
        address: "Plaça Príncep Benlloch, 1. AD500 Andorre-la-Vieille",
        postal: "08020",
        status: 1,
        job: 'Student',
        createdAt: '2022-01-25',
        updatedAt: '2022-01-25'
      }, {
        firstName: 'Lucy',
        lastName: 'Light',
        age: 30,
        documentId: "L389353",
        documentType: "passport",
        documentCountry: "Spain",
        documentExpedition: '2022-01-21',
        documentExpiration: '2022-01-29',
        sex: "F",
        phone: "+34986536888",
        email: "lucy.light@gmail.com",
        country: "Spain",
        nationality: "Andorra",
        city: "Andorra la Vella",
        address: "Príncep Benlloch, 1. AD500 Andorre-la-Vieille",
        postal: "08020",
        status: 1,
        job: 'lawyer',
        createdAt: '2022-01-25',
        updatedAt: '2022-01-25'
      }, {
        firstName: 'Must',
        lastName: 'Cusa',
        age: 30,
        documentId: "L378353",
        documentType: "passport",
        documentCountry: "Spain",
        documentExpedition: '2022-01-21',
        documentExpiration: '2022-01-29',
        sex: "M",
        phone: "+34986536888",
        email: "must.cusa@gmail.com",
        country: "Russia",
        nationality: "Russia",
        city: "Stalingrad",
        address: "AD500 1/2 facing the corner",
        postal: "08020",
        status: 1,
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
