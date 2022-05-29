const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

const EmployeeModel = sequelize.define(
  "employee",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = EmployeeModel;
