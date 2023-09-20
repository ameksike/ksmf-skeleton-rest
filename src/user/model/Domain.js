'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Domain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Domain.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    lot: DataTypes.STRING,
    status: DataTypes.INTEGER,
    idpIssuer: DataTypes.STRING,
    idpUrlEntry: DataTypes.TEXT,
    idpUrlLogin: DataTypes.TEXT,
    idpUrlLogout: DataTypes.TEXT,
    idpUrlFailure: DataTypes.TEXT,
    idpMetadata: DataTypes.TEXT,
    idpMapRole: DataTypes.TEXT,
    idpMapAttr: DataTypes.TEXT,
    idpType: DataTypes.INTEGER,
    idpCert: DataTypes.TEXT,
    asType: DataTypes.STRING,
    idpIdFormat: DataTypes.STRING,
    asUrlEntry: DataTypes.TEXT,
    asUrlToken: DataTypes.TEXT,
    asUrlRevoke: DataTypes.TEXT,
    asUrlMetadata: DataTypes.TEXT,
    asUrlProfile: DataTypes.TEXT,
    asCert: DataTypes.TEXT,
    asKey: DataTypes.TEXT,
    asUserAction: DataTypes.INTEGER,
    spVerify: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Domain',
  });
  return Domain;
};