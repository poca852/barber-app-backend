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
        get: function () { //Retorna los minutos unicamente
            let minutes = parseInt(this.getDataValue("time").slice(1,2)) * 60 + parseInt(this.getDataValue("time").slice(3,5),10)
            return minutes
          },
        allowNull: false
    },

    img: {
        type: DataTypes.STRING,
        defaultValue:'https://img2.freepng.es/20180405/pww/kisspng-hair-cutting-shears-scissors-computer-icons-scissor-5ac5cbedcb8877.1228515315229122378337.jpg',
        allowNull: true,
        // validate: {
        //     isUrl: true,

        //   }
    },
    state:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }

}, {timestamps: false});

module.exports = ServiceModel;