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
    }
  }
  LiveEvent.init(
    {
      eventDate: DataTypes.DATE,
      ticketPrice: DataTypes.FLOAT,
      eventsCapacity: DataTypes.INTEGER,
      liveStatus: DataTypes.ENUM('available', 'full', 'finished'),
    },
    {
      sequelize,
      modelName: 'LiveEvent',
    }
  );
  return LiveEvent;
};
