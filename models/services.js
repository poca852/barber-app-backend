const {DataTypes} = require('sequelize');
const sequelize = require('../database/config');

const ServiceModel = sequelize.define('services', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    detail: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull:false
    },

    time: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {timestamps: false});

module.exports = ServiceModel;