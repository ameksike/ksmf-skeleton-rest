'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupService.hasMany(models.Service, { foreignKey: 'id' });
      GroupService.hasMany(models.Group, { foreignKey: 'id' });
    }
  }
  GroupService.init({
    groupId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GroupService',
  });
  return GroupService;
};