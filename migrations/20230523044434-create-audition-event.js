'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AuditionEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Events',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      auditionNeeds: {
        type: Sequelize.STRING,
      },
      salary: {
        type: Sequelize.FLOAT,
      },
      requirements: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
      },
      numberOfMusicians: {
        type: Sequelize.INTEGER,
      },
      auditionStatus: {
        type: Sequelize.ENUM('ongoing', 'finished'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AuditionEvents');
  },
};
