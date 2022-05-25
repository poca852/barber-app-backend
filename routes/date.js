const router = require("express").Router();
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validar-campos.js");
const { addDate } = require("../controllers/date.js");

router.post(
  "/",
  // [
  //   (check("idUser", "name is required").isUUID(),
  //   check("idEmployee", "stock is required").isUUID(),
  //   check("total", "price is required").not().isEmpty().isFloat()),
  // check("date", "idCategorie is required").not().isEmpty().isUUID()),

  //   validarCampos,
  // ],
  addDate
);

// router.get("/", [check("name", "Name is not valid").isString()], getDates);

// router.get("/:id", [check("id", "Id is not valid").isUUID()], getDate);
module.exports = router;
