const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

const DateModel = sequelize.define(
  "date",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: true,
    },

    idUser: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    idEmployee: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    total: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    date: {
      type: DataTypes.DATE, //2022-01-17 04:33:12
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = DateModel;
