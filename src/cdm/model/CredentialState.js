'use strict';
const {
  Model
} = require('sequelize');
const KsCryp = require('kscryp');
module.exports = (sequelize, DataTypes) => {
  class CredentialState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CredentialState.belongsTo(models.Domain, { foreignKey: 'domainId' });
      CredentialState.belongsTo(models.Credential, { foreignKey: 'credentialId' });
      CredentialState.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  CredentialState.init({
    flow: DataTypes.BIGINT,
    credentialId: DataTypes.INTEGER,
    domainId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    affiliate: DataTypes.INTEGER,

    codeChallenge: DataTypes.TEXT,
    codeChallengeMethod: DataTypes.STRING,
    redirectUri: DataTypes.TEXT,
    responseType: DataTypes.STRING,
    scope: DataTypes.TEXT,
    state: DataTypes.TEXT,
    expirationTime: DataTypes.TEXT,
    expirationSecret: DataTypes.TEXT,
    refreshTime: DataTypes.TEXT,
    refreshSecret: DataTypes.TEXT,
    metadata: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawVa = this.getDataValue('metadata');
        if (!rawVa) {
          return rawVa;
        }
        const value = KsCryp.decode(rawVa, "json", { defaultValue: null, strict: true, clean: true });
        if (!value) {
          logger.error({
            src: "models:db:CredentialState:metadata:get",
            message: "Invalid JSON format",
            data: rawVa
          });
        }
        return value;
      },
      set(value = {}) {
        const rawVa = KsCryp.encode(value, "json", { clean: true });
        if (!rawVa) {
          logger.error({
            src: "models:db:CredentialState:metadata:set",
            message: "Invalid JSON format",
            data: value
          });
          return null;
        }
        this.setDataValue('metadata', rawVa);
      }
    },
    userAgent: DataTypes.TEXT,
    code: DataTypes.TEXT,
    note: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'CredentialState',
  });
  return CredentialState;
};