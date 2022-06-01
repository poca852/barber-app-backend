const router = require("express").Router();
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validar-campos.js");
const {
  validateDateTime,
  validateDate,
} = require("../helpers/customValidators");
const { checkDates } = require("../helpers/db-validators.js");
const { addDate, getDates, deleteDate } = require("../controllers/date.js");
const { verificarCitaId } = require("../helpers/db-validators");

router.post(
  "/",
  [
    check("date").custom(checkDates),
    //check("idUser").isUUID(),
    //check("idEmployee").isUUID(),
    check("total", "total is required").not().isEmpty().isFloat(),
    //check("date").custom(validateDateTime),
    validarCampos,
  ],
  addDate
);

router.get(
  "/",
  [
    //check("date").custom(validateDate),
    validarCampos,
  ],
  getDates
);

// router.get("/:id", [check("id", "Id is not valid").isUUID()], getDate);

// eliminar un a cita
router.delete(
  "/:id",
  [
    // check("idDate", "el id no es valido").isUUID(),
    // check("idDate").custom(verificarCitaId),
    // validarCampos,
  ],
  deleteDate
);
module.exports = router;
