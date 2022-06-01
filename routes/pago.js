const {Router}= require ("express")
const {check} = require("express-validator")
const {validarCampos, validarJWT} = require('../middlewares');
const {getPago, addPago, confirmarPago}= require("../controllers/pago")

const router= Router()

router.get("/", validarJWT, getPago)

router.post("/",[
   check("idPurchaseOrder", "idPurchaseOrder is required").not().isEmpty().isUUID(),
   check("formaPago", "forma de pago is required").not().isEmpty().isString(),
   validarCampos
],
addPago)

router.post("/confirmation", confirmarPago)

module.exports = router;