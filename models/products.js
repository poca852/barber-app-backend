const {DataTypes} = require('sequelize');
const CategorieModel = require('./categorie')
const sequelize = require('../database/config');

const ProductsModel = sequelize.define('products', {
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
    detail:{
        type: DataTypes.TEXT,
        allowNull: false

    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            isEven(value) {
              if(value <0) {
                throw new Error('El Stock no puede ser menor a cero!')
              }
            }
          }
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull:false
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    stateFavourites:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },

    idCategorie: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: CategorieModel,
            key: 'id'
        }
   
    },

    img: {
        type: DataTypes.STRING,
    }
}, {timestamps: false});

module.exports = ProductsModel;