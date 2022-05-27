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
        type: DataTypes.STRING,
        allowNull: false

    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull:false
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
        defaultValue:'https://m.media-amazon.com/images/I/71HMYf1sp1L._SX355_.jpg',
        allowNull: true,
        // validate: {
        //     isUrl: true,

        //   }
    }
}, {timestamps: false});

module.exports = ProductsModel;