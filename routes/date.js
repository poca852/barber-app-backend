const router = require("express").Router();
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validar-campos.js");
const {validateDateTime, validateDate} = require('../helpers/customValidators');
const {checkDates} = require('../helpers/db-validators.js'); 
const { addDate, getDates } = require("../controllers/date.js");

router.post("/", [
     check("date").custom(checkDates),
     //check("idUser").isUUID(),
     //check("idEmployee").isUUID(),
     check("total", "total is required").not().isEmpty().isFloat(),
     //check("date").custom(validateDateTime),
     validarCampos,
   ],addDate);

router.get("/", [
  //check("date").custom(validateDate),
  validarCampos],
   getDates);

// router.get("/:id", [check("id", "Id is not valid").isUUID()], getDate);
module.exports = router;
