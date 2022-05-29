const {DataTypes, BOOLEAN} = require('sequelize');
const sequelize = require('../database/config');
const UserModel = require('../models/usuario');


const PurchaseOrder = sequelize.define('purchaseOrder', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    idUser: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
   
    },

    quantity: {
        type: DataTypes.INTEGER
    },

    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }

}, {timestamps: false});

module.exports = PurchaseOrder;