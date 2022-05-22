const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    native: false,
    dialectOptions: {
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;