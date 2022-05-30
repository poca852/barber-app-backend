const {DataTypes}= require("sequelize")
const sequelize = require('../database/config');
<<<<<<< HEAD
const PurchaseOrder = require("./purchaseOrder");

const PagoModel = sequelize.define('pago', {
    
=======

const PagoModel = sequelize.define('pago', {
>>>>>>> ramaconsu
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
    moneda:{
        type: DataTypes.STRING,
        allowNull: true
    },
<<<<<<< HEAD
    idPurchaseOrder: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: PurchaseOrder,
            key: 'id'
        }
   
    },

}, {timestamps: false})
module.export = PagoModel
=======
    idOrdCompra:{
        type: DataTypes.UUID,
        allowNull: false
    }


}, {timestamps: false})
modules.export = PagoModel


>>>>>>> ramaconsu
