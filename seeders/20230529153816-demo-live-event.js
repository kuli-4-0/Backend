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
          ticketPrice: 460000,
          eventsCapacity: 100,
          liveStatus: 'available',
          eventId: 1, // ID event yang sesuai
          duration: 2,
          musicianName: 'Agnes Monica',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 200000,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 3, // ID event yang sesuai
          duration: 2,
          musicianName: 'Kangen Band',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 100000,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 5, // ID event yang sesuai
          duration: 5,
          musicianName: 'Afgan',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 500000,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 6, // ID event yang sesuai
          duration: 6,
          musicianName: 'Bunga Citra Lestari',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 300000,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 7, // ID event yang sesuai
          duration: 8,
          musicianName: 'Noah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 350000,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 8, // ID event yang sesuai
          duration: 8,
          musicianName: 'Noah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 275000,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 9, // ID event yang sesuai
          duration: 8,
          musicianName: 'Padi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 198000,
          eventsCapacity: 180,
          liveStatus: 'available',
          eventId: 10, // ID event yang sesuai
          duration: 8,
          musicianName: 'Slank',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 750000,
          eventsCapacity: 100,
          liveStatus: 'available',
          eventId: 11, // ID event yang sesuai
          duration: 8,
          musicianName: 'Kangen Band',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 550000,
          eventsCapacity: 300,
          liveStatus: 'available',
          eventId: 12, // ID event yang sesuai
          duration: 8,
          musicianName: 'Nidji',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 172000,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 13, // ID event yang sesuai
          duration: 8,
          musicianName: 'Element',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 610000,
          eventsCapacity: 60,
          liveStatus: 'available',
          eventId: 14, // ID event yang sesuai
          duration: 8,
          musicianName: 'Dewa 19',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 401000,
          eventsCapacity: 200,
          liveStatus: 'available',
          eventId: 15, // ID event yang sesuai
          duration: 6,
          musicianName: 'Naff',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 340000,
          eventsCapacity: 150,
          liveStatus: 'available',
          eventId: 16, // ID event yang sesuai
          duration: 6,
          musicianName: 'Isyana Sarasvati',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 670000,
          eventsCapacity: 280,
          liveStatus: 'available',
          eventId: 17, // ID event yang sesuai
          duration: 6,
          musicianName: 'Repvblik',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 480000,
          eventsCapacity: 500,
          liveStatus: 'available',
          eventId: 18, // ID event yang sesuai
          duration: 10,
          musicianName: 'Vierra',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 400000,
          eventsCapacity: 600,
          liveStatus: 'available',
          eventId: 19, // ID event yang sesuai
          duration: 10,
          musicianName: 'Bunga Citra Lestari',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 360000,
          eventsCapacity: 460,
          liveStatus: 'available',
          eventId: 20, // ID event yang sesuai
          duration: 10,
          musicianName: 'Armada',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 200000,
          eventsCapacity: 100,
          liveStatus: 'available',
          eventId: 21, // ID event yang sesuai
          duration: 8,
          musicianName: 'HIVI!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 123000,
          eventsCapacity: 123,
          liveStatus: 'available',
          eventId: 22, // ID event yang sesuai
          duration: 8,
          musicianName: 'Kangen Band',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 450000,
          eventsCapacity: 450,
          liveStatus: 'available',
          eventId: 23, // ID event yang sesuai
          duration: 8,
          musicianName: 'Tulus',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 640000,
          eventsCapacity: 540,
          liveStatus: 'available',
          eventId: 24, // ID event yang sesuai
          duration: 8,
          musicianName: 'Sheila On 7',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 470000,
          eventsCapacity: 340,
          liveStatus: 'available',
          eventId: 25, // ID event yang sesuai
          duration: 8,
          musicianName: 'Andra and The Backbone',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventDate: new Date(),
          ticketPrice: 300000,
          eventsCapacity: 4560,
          liveStatus: 'available',
          eventId: 26, // ID event yang sesuai
          duration: 8,
          musicianName: 'Vierra',
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
