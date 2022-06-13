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
        type: DataTypes.TEXT,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull:false
    },

    time: {
        type: DataTypes.TIME,
        allowNull: false
    },

    img: {
        type: DataTypes.STRING
    },
    state:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }

}, {timestamps: false});

module.exports = ServiceModel;