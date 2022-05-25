const { Sequelize } = require("sequelize");

// Esto solo se usa en desarrollo de momento se comentara para subir a heroku
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// TODO: aqui se debe cambiar a la variable de entorno de DATABASE_URL  PARA QUE PUEDA FUNCIONAR EN PRODUCCION
// conexion local = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
    // RECORDAR: muy importante esto se debe dejar en produccion, en desarrollo se puede quitar.
    // dialectOptions: {
    //   // ssl: {
    //   //   require: true,
    //   //   rejectUnauthorized: false,
    //   // },
    // },
  }
);

module.exports = sequelize;
