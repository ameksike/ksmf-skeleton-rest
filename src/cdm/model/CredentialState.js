'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CredentialState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CredentialState.hasOne(models.Domain);
      CredentialState.hasOne(models.Credential);
      CredentialState.hasOne(models.User);
    }
  }
  CredentialState.init({
    flow: DataTypes.BIGINT,
    credentialId: DataTypes.INTEGER,
    domainId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    scope: DataTypes.TEXT,
    state: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    redirectUri: DataTypes.TEXT,
    metadata: DataTypes.TEXT,
    note: DataTypes.TEXT,
    secret: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CredentialState',
  });
  return CredentialState;
};