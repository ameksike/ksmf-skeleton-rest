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
    }
  }
  Credential.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    clientId: DataTypes.TEXT,
    clientSecret: DataTypes.TEXT,
    metadata: DataTypes.TEXT,
    codeChallenge: DataTypes.TEXT,
    codeChallengeMethod: DataTypes.STRING,
    redirectUri: DataTypes.TEXT,
    responseType: DataTypes.STRING,
    scope: DataTypes.TEXT,
    state: DataTypes.TEXT,
    type: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Credential',
  });
  return Credential;
};