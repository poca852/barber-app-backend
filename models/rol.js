const {DataTypes} = require('sequelize');
const sequelize = require('../database/config');

const RolModel = sequelize.define('rol', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
   },

   rol: {
      type: DataTypes.STRING,
      allowNull: false
   }
}, {timestamps: false});

module.exports = RolModel