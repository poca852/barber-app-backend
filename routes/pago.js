const {Router}= require ("express")
const {check} = require("express-validator")
const {validarCampos}= require ("../helpers")
<<<<<<< HEAD
const {getPago, addPago}= require("../controllers/pago")
=======
const {getPago, postPago}= require("../controllers")
>>>>>>> ramaconsu


const router= Router()

<<<<<<< HEAD
router.get("./",getPago)


router.post("./",[
check("idPurchaseOrder", "idPurchaseOrder is required").not().isEmpty().isUUID(),
check("formaPago", "forma de pago is required").not().isEmpty().isString(),
validarCampos
],
addPago)
=======
router.get("./",[
check(),
validarCampos
],
getPago)


router.post("./",[
check(),
validarCampos
],
postPago)
>>>>>>> ramaconsu
