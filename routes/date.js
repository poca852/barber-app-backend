const router = require("express").Router();
const { check } = require("express-validator");
const {validarCampos, validarJWT} = require("../middlewares");
const {validateDateTime, validateDate} = require('../helpers/customValidators');
const {checkDates} = require('../helpers/db-validators.js'); 
const { addDate, getDates, deleteDate } = require("../controllers/date.js");

router.post("/", [
     check("date").custom(checkDates),
     //check("idUser").isUUID(),
     //check("idEmployee").isUUID(),
     //check("date").custom(validateDateTime),
     validarCampos,
   ],addDate);

router.get("/", [
  //check("date").custom(validateDate),
  validarCampos],
   getDates);

// router.get("/:id", [check("id", "Id is not valid").isUUID()], getDate);

router.delete("/:id", 
validarJWT,
[check("id", "Id is not valid").isUUID()], 
deleteDate);


module.exports = router;
