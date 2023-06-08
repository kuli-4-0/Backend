'use strict';

/** @type {import('sequelize-cli').Migration} */
const resetAutoIncrement = async (queryInterface) => {
  try {
    // Menjalankan perintah SQL untuk mengatur nilai auto increment menjadi 1
    await queryInterface.sequelize.query(
      'ALTER TABLE Events AUTO_INCREMENT = 1'
    );
    console.log('Auto increment reset to 1');
  } catch (error) {
    console.error('Failed to reset auto increment:', error);
  }
};
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Events',
      [
        {
          name: 'Event Admin 1',
          location: 'Event Admin Location',
          date: new Date('2023-05-20'),
          poster: 'https://storage.googleapis.com/elise-bucket/default.jpg',
          status: 'Live',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          genre: 'rock',
        },
        {
          name: 'Event Admin 2',
          location: 'Event Admin Location',
          date: new Date('2023-05-20'),
          poster: 'https://storage.googleapis.com/elise-bucket/default.jpg',
          status: 'Audition',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          genre: 'pop',
        },
        {
          name: 'Event Organizer Event 1',
          location: 'Event Organizer Location',
          date: new Date('2023-05-20'),
          poster: 'https://storage.googleapis.com/elise-bucket/default.jpg',
          status: 'Live',
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          genre: 'Jazz',
        },
        {
          name: 'Event Organizer Event 2',
          location: 'Event Organizer Location',
          date: new Date('2023-05-20'),
          poster: 'https://storage.googleapis.com/elise-bucket/default.jpg',
          status: 'Audition',
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          genre: 'Jazz',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
    await resetAutoIncrement(queryInterface);
  },
};
