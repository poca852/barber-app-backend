const {DataTypes}= require("sequelize")
const sequelize = require('../database/config');
const PurchaseOrder = require("./purchaseOrder");


const PagoModel = sequelize.define('pago', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    pagado:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    },
    formaPago:{
        type: DataTypes.STRING,
        allowNull: false
    },

    idPurchaseOrder: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: PurchaseOrder,
            key: 'id'
        }
   
    },

}, {timestamps: false})


module.exports = PagoModel

