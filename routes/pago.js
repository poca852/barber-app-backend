const {Router}= require ("express")
const {check} = require("express-validator")
const {validarCampos, validarJWT} = require('../middlewares');
const {getPago, addPago, confirmarPago}= require("../controllers/pago")

const router= Router()

<<<<<<< HEAD
router.get("/",getPago)

router.post("/confirmation",[
check("idPurchaseOrder", "idPurchaseOrder is required").not().isEmpty().isUUID(),
check("formaPago", "forma de pago is required").not().isEmpty().isString(),
validarCampos
=======
router.get("/", validarJWT, getPago)

router.post("/",[
   check("idPurchaseOrder", "idPurchaseOrder is required").not().isEmpty().isUUID(),
   check("formaPago", "forma de pago is required").not().isEmpty().isString(),
   validarCampos
>>>>>>> b604fea8580167460d6e31b5141b1441ed63d25c
],
addPago)

router.post("/confirmation", confirmarPago)

module.exports = router;