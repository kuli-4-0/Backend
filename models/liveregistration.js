'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LiveRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LiveRegistration.belongsTo(models.LiveEvent, {
        foreignKey: 'liveEventId',
      });
      LiveRegistration.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      LiveRegistration.hasOne(models.Payment, {
        foreignKey: 'liveRegistrationId',
      });
    }
  }
  LiveRegistration.init(
    {
      liveEventId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      purchaseAt: DataTypes.DATE,
      isPaid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'LiveRegistration',
    }
  );
  return LiveRegistration;
};
