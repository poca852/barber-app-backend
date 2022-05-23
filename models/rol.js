const {DataTypes} = require('sequelize');
const sequelize = require('../database/config');

const RolModel = sequelize.define('rol', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },

   rol: {
      type: DataTypes.STRING,
      allowNull: false
   }
}, {timestamps: false});

module.exports = RolModel