const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Date extends Model {}

Date.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: "restaurant",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      refrences: {
        model: "user",
        key: "id",
      },
    },
    date_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      refrences: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "date",
  }
);

module.exports = Date;
