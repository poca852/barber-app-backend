const {DataTypes} = require('sequelize');
const sequelize = require('../database/config');
const Rolmodel = require('./rol');  

const UserModel = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING,
        // allowNull: false
    },

    img: {
        type: DataTypes.STRING
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },

  
    address:{
        type: DataTypes.STRING,
        allowNull: true
    },

    idRol: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: Rolmodel,
            key: 'id'
        }
    }
}, {timestamps: false});

module.exports = UserModel;