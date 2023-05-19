'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Event.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      date: DataTypes.DATE,
      poster: DataTypes.STRING,
      status: DataTypes.ENUM('Audisi', 'Live'),
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Event',
    }
  );
  return Event;
};
