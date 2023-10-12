'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Credential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Credential.hasMany(models.CredentialState, { foreignKey: 'credentialId'});
      Credential.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
    }
  }
  Credential.init({
    avatar: DataTypes.TEXT,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    clientId: DataTypes.TEXT,
    clientSecret: DataTypes.TEXT,
    type: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    metadata: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    redirectUri: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Credential',
  });
  return Credential;
};