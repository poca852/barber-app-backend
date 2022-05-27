const {DataTypes}= require("sequelize")
const sequelize = require('../database/config');

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
    moneda:{
        type: DataTypes.STRING,
        allowNull: true
    },
    idOrdCompra:{
        type: DataTypes.UUID,
        allowNull: false
    }


}, {timestamps: false})
modules.export = PagoModel


