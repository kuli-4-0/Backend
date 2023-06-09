'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LiveEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LiveEvent.belongsTo(models.Event, { foreignKey: 'eventId' });
      LiveEvent.hasMany(models.LiveRegistration, { foreignKey: 'liveEventId' });
    }
  }
  LiveEvent.init(
    {
      eventDate: DataTypes.DATE,
      ticketPrice: DataTypes.FLOAT,
      eventsCapacity: DataTypes.INTEGER,
      liveStatus: DataTypes.ENUM('available', 'full', 'finished'),
      duration: DataTypes.INTEGER,
      musicianName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'LiveEvent',
    }
  );
  return LiveEvent;
};
