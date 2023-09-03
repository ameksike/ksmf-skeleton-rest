'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Affiliate, { foreignKey: 'ownerId' });
      /*User.hasMany(models.Affiliate, { foreignKey: 'userId', as: "Affiliates" });
*/
      User.hasMany(models.Customer, { foreignKey: 'userId' });
      User.hasMany(models.Supplier, { foreignKey: 'userId' });

      User.belongsToMany(models.Group, { through: models.GroupUsers, foreignKey: 'userId' });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    documentId: {
      type: DataTypes.STRING
    },
    documentType: {
      type: DataTypes.STRING
    },
    documentCountry: {
      type: DataTypes.STRING
    },
    documentExpedition: {
      type: DataTypes.DATE
    },
    documentExpiration: {
      type: DataTypes.DATE
    },
    age: {
      type: DataTypes.INTEGER
    },
    sex: {
      type: DataTypes.STRING(1)
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    nationality: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    postal: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.INTEGER
    },
    note: {
      type: DataTypes.TEXT
    },
    job: {
      defaultValue: 'None',
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};