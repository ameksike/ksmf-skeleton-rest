'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bill.belongsTo(models.Service, { foreignKey: 'serviceId' });
    }
  }
  Bill.init({
    serviceId: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    change: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    taxPercent: DataTypes.INTEGER,
    transport: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    discountPercent: DataTypes.INTEGER,
    decrease: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    benefit: DataTypes.INTEGER,
    benefitPercent: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    profitPercent: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};