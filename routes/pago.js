const {Router}= require ("express")
const {check} = require("express-validator")
const {validarCampos}= require ("../helpers")
const {getPago, postPago}= require("../controllers")


const router= Router()

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