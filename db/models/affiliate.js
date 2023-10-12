'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Affiliate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Affiliate.belongsTo(models.Campaign, { foreignKey: 'campaignId' });
      Affiliate.belongsTo(models.User, { foreignKey: 'ownerId' });
      //Affiliate.hasMany(models.User, { foreignKey: 'userId', as: "Affiliates" });
    }
  }
  Affiliate.init({
    code: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    campaignId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Affiliate',
  });
  return Affiliate;
};