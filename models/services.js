const {DataTypes} = require('sequelize');
const sequelize = require('../database/config');

const UserModel = sequelize.define('services', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {timestamps: false});

module.exports = UserModel;