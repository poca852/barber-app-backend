const router = require("express").Router();
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validar-campos.js");
const {
  validateDateTime,
  validateDate,
} = require("../helpers/customValidators");
const { checkDates } = require("../helpers/db-validators.js");
const {
  addFavorite,
  getFavorite,
  deleteFavorite,
  deleteFavoriteParams,
} = require("../controllers/favorite.js");
const { verificarCitaId } = require("../helpers/db-validators");

router.post("/", addFavorite);

router.get("/", getFavorite);

// router.get("/:id", [check("id", "Id is not valid").isUUID()], getDate);

router.delete(
  "/",
  // [check("id", "Id is not valid").isUUID()],
  deleteFavorite
);
router.delete(
  "/:idUser/:idProduct",
  // [check("id", "Id is not valid").isUUID()],
  deleteFavoriteParams
);

module.exports = router;
