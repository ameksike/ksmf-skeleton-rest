'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsToMany(models.Tag, { through: models.TagComment });
      Comment.hasMany(models.TagComment);
      Comment.belongsTo(models.User);
    }
  }
  Comment.init({
    comment: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    flightId: DataTypes.INTEGER,
    date: {
      defaultValue: Date.now(),
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};