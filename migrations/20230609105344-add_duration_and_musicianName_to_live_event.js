'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('LiveEvents', 'duration', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('LiveEvents', 'musicianName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('LiveEvents', 'duration');
    await queryInterface.removeColumn('LiveEvents', 'musicianName');
  },
};
