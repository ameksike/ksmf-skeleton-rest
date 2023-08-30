'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  campaign.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    percent: DataTypes.INTEGER,
    minimum: DataTypes.INTEGER,
    maximum: DataTypes.INTEGER,
    expiration: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'campaign',
  });
  return campaign;
};