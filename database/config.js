// NOTA POR FAVOR NO MODIFICAR ABSOLUTAMENTE NADA

const { Sequelize } = require("sequelize");

const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
const conexion_local = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
const conexion_remota = process.env.DATABASE_URL;

const options_local = {
   logging: false,
   native: false
}

const options_remoto = {
   logging: false,
   native: false,
   dialectOptions: {
      ssl: {
      require: true,
      rejectUnauthorized: false,
     },
  },
}

const sequelize = new Sequelize(
   conexion_remota || conexion_local,
   conexion_remota ? options_remoto : options_local);

module.exports = sequelize;