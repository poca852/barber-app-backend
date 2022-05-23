const {Sequelize} = require('sequelize');
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false,
    native: false,
    //error de ssl
    dialectOptions: {
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;