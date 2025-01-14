"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class typeHero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      typeHero.hasMany(models.Heroes, {
        foreignKey: "type_id",
        as: "Heroes",
      });
      // define association here
    }
  }
  typeHero.init(
    {
      typehero: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "typeHero",
    }
  );
  return typeHero;
};
