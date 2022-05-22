const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    native: false
});

module.exports = sequelize;