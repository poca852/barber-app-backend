const {Router}= require ("express")
const {check} = require("express-validator")
const {validarCampos} = require('../middlewares');
const {getPago, addPago}= require("../controllers/pago")

const router= Router()

router.get("/",getPago)

router.post("/",[
check("idPurchaseOrder", "idPurchaseOrder is required").not().isEmpty().isUUID(),
check("formaPago", "forma de pago is required").not().isEmpty().isString(),
validarCampos
],
addPago)

module.exports = router;