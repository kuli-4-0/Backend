'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuditionRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AuditionRegistration.belongsTo(models.AuditionEvent, {
        foreignKey: 'auditionEventId',
      });
      AuditionRegistration.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  AuditionRegistration.init(
    {
      description: DataTypes.STRING,
      photo: DataTypes.STRING,
      status: DataTypes.ENUM('being_selected', 'accepted', 'rejected'),
    },
    {
      sequelize,
      modelName: 'AuditionRegistration',
    }
  );
  return AuditionRegistration;
};
