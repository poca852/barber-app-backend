const {Router}= require ("express");
const {validarCampos, validarJWT} = require('../middlewares');
const {getPago, getPagoId, confirmarPago}= require("../controllers/pago");

const router= Router()

router.get("/", [
   /*validarJWT*/
], getPago)

router.get("/:idUser", [
   /*validarJWT*/
], getPagoId)

router.post("/confirmation", confirmarPago)

module.exports = router;