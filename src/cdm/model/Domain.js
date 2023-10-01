'use strict';
const {
  Model
} = require('sequelize');
const KsCryp = require('kscryp');

module.exports = (sequelize, DataTypes) => {
  class Domain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Domain.hasMany(models.CredentialState);
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
    idpMapAttr: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawVa = this.getDataValue('idpMapAttr');
        if (!rawVa) {
          return rawVa;
        }
        const value = KsCryp.decode(rawVa, "json", { defaultValue: null, strict: true, clean: true });
        if (!value) {
          logger.error({
            src: "models:db:domain:idpMapAttr:get",
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
            src: "models:db:domain:idpMapAttr:set",
            message: "Invalid JSON format",
            data: value
          });
          return null;
        }
        this.setDataValue('idpMapAttr', rawVa);
      }
    },
    idpMapRole: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawVa = this.getDataValue('idpMapRole');
        if (!rawVa) {
          return rawVa;
        }
        const value = KsCryp.decode(rawVa, "json", { defaultValue: null, strict: true, clean: true });
        if (!value) {
          logger.error({
            src: "models:db:domain:idpMapRole:get",
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
            src: "models:db:domain:idpMapRole:set",
            message: "Invalid JSON format",
            data: value
          });
          return null;
        }
        this.setDataValue('idpMapRole', rawVa);
      }
    },

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
    asMetadata: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawVa = this.getDataValue('asMetadata');
        if (!rawVa) {
          return rawVa;
        }
        const value = KsCryp.decode(rawVa, "json", { defaultValue: null, strict: true, clean: true });
        if (!value) {
          logger.error({
            src: "models:db:domain:asMetadata:get",
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
            src: "models:db:domain:asMetadata:set",
            message: "Invalid JSON format",
            data: value
          });
          return null;
        }
        this.setDataValue('asMetadata', rawVa);
      }
    },
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