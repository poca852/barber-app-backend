// express
const { Router } = require("express");
const { check } = require("express-validator");
// controllers
const { getEmployees2 } = require("../controllers/employee copy");
// helpers
const {
  existeEmploye,
  existeEmployeById,
} = require("../helpers/db-validators");
// middlewares
const { validarCampos } = require("../middlewares");

const router = Router();

// crear employee

// obtener todos los empleados o buscar uno en particular
// router.get("/", getEmployee);
router.get("/", getEmployees2);

// obetener un empleado por id

module.exports = router;
