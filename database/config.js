const {Sequelize} = require('sequelize');
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;

// TODO: aqui se debe cambiar a la variable de entorno de DATABASE_URL  PARA QUE PUEDA FUNCIONAR EN PRODUCCION
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false,
    native: false,
    //error de ssl
    // dialectOptions: {
    //     ssl:{
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
});

module.exports = sequelize;