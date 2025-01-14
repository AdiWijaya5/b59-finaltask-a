"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Heroes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Heroes.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Heroes.belongsTo(models.typeHero, {
        foreignKey: "type_id",
        as: "typehero",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Heroes.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      user_id: DataTypes.STRING,
      type_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Heroes",
    }
  );
  return Heroes;
};
