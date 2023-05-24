'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuditionEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AuditionEvent.belongsTo(models.Event, { foreignKey: 'eventId' });
    }
  }
  AuditionEvent.init(
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      auditionNeeds: DataTypes.STRING,
      salary: DataTypes.FLOAT,
      requirements: DataTypes.STRING,
      genre: DataTypes.STRING,
      numberOfMusicians: DataTypes.INTEGER,
      auditionStatus: DataTypes.ENUM('ongoing', 'finished'),
    },
    {
      sequelize,
      modelName: 'AuditionEvent',
    }
  );
  return AuditionEvent;
};
