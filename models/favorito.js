const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");
const EmployeeModel = require("./employee");
const UserModel = require("./usuario");
const FavoriteModel = sequelize.define(
  "favorite",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    idProduct: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    idUser: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    // state: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true,
    // },
  },
  { timestamps: false }
);

module.exports = FavoriteModel;
