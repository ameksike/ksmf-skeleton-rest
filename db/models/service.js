'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    ownerName: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    country: DataTypes.STRING,
    address: DataTypes.STRING,
    grupoId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    store: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};