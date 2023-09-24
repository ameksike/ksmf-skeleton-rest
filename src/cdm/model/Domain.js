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
    idpUrlEntry: DataTypes.TEXT,
    idpUrlEntryBack: DataTypes.TEXT,
    idpUrlToken: DataTypes.TEXT,
    idpUrlRevoke: DataTypes.TEXT,
    idpUrlRevokeBack: DataTypes.TEXT,
    idpUrlFailure: DataTypes.TEXT,
    idpUrlProfile: DataTypes.TEXT,
    idpMetadata: DataTypes.TEXT,
    idpMapRole: DataTypes.TEXT,
    idpMapAttr: DataTypes.TEXT,
    idpCert: DataTypes.TEXT,
    idpId: DataTypes.TEXT,
    idpSecret: DataTypes.TEXT,
    idpIdFormat: DataTypes.STRING,
    idpIssuer: DataTypes.STRING,
    idpType: DataTypes.STRING,
    asType: DataTypes.STRING,
    asUrlEntry: DataTypes.TEXT,
    asUrlToken: DataTypes.TEXT,
    asUrlRevoke: DataTypes.TEXT,
    asUrlProfile: DataTypes.TEXT,
    asMetadata: DataTypes.TEXT,
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