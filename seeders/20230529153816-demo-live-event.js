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
      'LiveEvents',
      [
        {
          eventDate: new Date(),
          ticketPrice: 9.99,
          eventsCapacity: 100,
          liveStatus: 'available',
          eventId: 1, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 3, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 5, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 6, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 7, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 8, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 9, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 10, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 11, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 12, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 13, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 14, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 15, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 16, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 17, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 18, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 19, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 20, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 21, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 22, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 23, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 19.99,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 24, // ID event yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('LiveEvents', null, {});
    await resetAutoIncrement(queryInterface);
  },
};
