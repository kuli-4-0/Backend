'use strict';

/** @type {import('sequelize-cli').Migration} */
const resetAutoIncrement = async (queryInterface) => {
  try {
    // Menjalankan perintah SQL untuk mengatur nilai auto increment menjadi 1
    await queryInterface.sequelize.query(
      'ALTER TABLE Users AUTO_INCREMENT = 1'
    );
    console.log('Auto increment reset to 1');
  } catch (error) {
    console.error('Failed to reset auto increment:', error);
  }
};
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'AuditionEvents',
      [
        {
          startDate: new Date(),
          endDate: new Date(),
          auditionNeeds: 'Some needs',
          salary: 1000.0,
          requirements: 'Some requirements',
          genre: 'Some genre',
          numberOfMusicians: 5,
          auditionStatus: 'ongoing',
          eventId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startDate: new Date(),
          endDate: new Date(),
          auditionNeeds: 'Some needs',
          salary: 1500.0,
          requirements: 'Some requirements',
          genre: 'Some genre',
          numberOfMusicians: 3,
          auditionStatus: 'ongoing',
          eventId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AuditionEvents', null, {});
    await resetAutoIncrement(queryInterface);
  },
};
