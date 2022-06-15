const router = require("express").Router();
const { check } = require("express-validator");
const { validarCampos, validarJWT } = require("../middlewares");
const { checkDates } = require('../helpers/db-validators.js');
const { addDate, getDates, deleteDate, getDate, dateFinished } = require("../controllers/date.js");
const { verificarCitaId } = require("../helpers/db-validators");

router.post("/", [
  // check("date").custom(checkDates),
  check("idUser").isUUID(),
  check("idEmployee").isUUID(),
  check ("service").isString().not().isEmpty(),
  validarCampos,
], addDate);

router.get("/", [validarCampos,], getDates);

router.get("/:id", [check("id", "Id is not valid").isUUID()], getDate);

router.delete("/:id",
 validarJWT,
  [check("id", "Id is not valid").isUUID()],
  deleteDate);

router.put("/:id",
  validarJWT,
  [check("id", "Id is not valid").isUUID()],
  dateFinished);


module.exports = router;
