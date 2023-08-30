'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bill.init({
    service_id: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    change: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    tax_percent: DataTypes.INTEGER,
    transport: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    discount_percent: DataTypes.INTEGER,
    decrease: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    benefit: DataTypes.INTEGER,
    benefit_percent: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    profit_percent: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bill',
  });
  return bill;
};