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

    transaction_amount:{
        type: DataTypes.INTEGER
    },

    shipping_cost:{
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.STRING
    },

    operation_type:{
        type: DataTypes.STRING
    },

    currency_id:{
        type: DataTypes.STRING
    },

    date_approved:{
        type:DataTypes.STRING
    },

    dataProducts:{
        type: DataTypes.ARRAY(DataTypes.JSON)
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

