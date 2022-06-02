const {DataTypes}= require("sequelize")
const sequelize = require('../database/config');
const DateModel = require("./date");


const Mail = sequelize.define('mail', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    texto:{
        type: DataTypes.STRING,
        allowNull: true
    },
    idDate: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: DateModel,
            key: 'id'}},
    nombre :{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false}

        

}, {timestamps: false})


module.exports = Mail