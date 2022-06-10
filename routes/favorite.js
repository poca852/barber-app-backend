const router = require("express").Router();
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares');
const {verificarId} = require('../helpers/db-validators');

const {
  addFavorite,
  getFavorite,
  deleteFavorite,
  deleteFavoriteParams,
} = require("../controllers/favorite.js");

router.post("/", addFavorite);

router.get("/:idUser",[
  check('idUser',"No es un id valido").isUUID().not().isEmpty(),
  check('idUser').custom(verificarId),
  validarCampos
], getFavorite);

router.delete(
  "/", 
  deleteFavorite
);


module.exports = router;
