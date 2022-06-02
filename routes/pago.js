const {Router}= require ("express")
const {check} = require("express-validator")
const {validarCampos, validarJWT} = require('../middlewares');
const {getPago, addPago, confirmarPago}= require("../controllers/pago")

const router= Router()

router.get("/", validarJWT, getPago)

router.post("/confirmation", confirmarPago)

module.exports = router;