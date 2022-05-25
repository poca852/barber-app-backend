const {DataTypes} = require('sequelize');
const sequelize = require('../database/config');

const CategorieModel = sequelize.define('categories', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
   },

   categorie: {
      type: DataTypes.STRING,
      allowNull: false
   }
}, {timestamps: false});

module.exports = CategorieModel