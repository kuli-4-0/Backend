'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Events',
      [
        {
          name: 'Event Organizer Event',
          location: 'Event Organizer Location',
          date: new Date('2023-05-20'),
          poster: 'event.jpg',
          status: 'Live',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  },
};
