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
      'Users',
      [
        {
          name: 'admin',
          email: 'admin@gmail.com',
          password:
            '$2b$10$dl0yTgUKuiJwpho/2uFGy.g.knKbn3crq6rDTVVA3x7KE.ik4tTz.',
          role: 'admin',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'user',
          email: 'user@gmail.com',
          password:
            '$2b$10$dl0yTgUKuiJwpho/2uFGy.g.knKbn3crq6rDTVVA3x7KE.ik4tTz.',
          role: 'user',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'musisi',
          email: 'musisi@gmail.com',
          password:
            '$2b$10$dl0yTgUKuiJwpho/2uFGy.g.knKbn3crq6rDTVVA3x7KE.ik4tTz.',
          role: 'musisi',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'event organizer',
          email: 'event_organizer@gmail.com',
          password:
            '$2b$10$dl0yTgUKuiJwpho/2uFGy.g.knKbn3crq6rDTVVA3x7KE.ik4tTz.',
          role: 'event_organizer',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await resetAutoIncrement(queryInterface);
  },
};
