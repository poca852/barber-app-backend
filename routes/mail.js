const {Router}= require ("express")
//const {check} = require("express-validator")
//const validarCampos = require('../middlewares/validar-campos.js');
const {addMail}= require("../controllers/mail")

const router = Router()

router.get("/",
(req, res)=> console.log("okiiis"))

router.post("/", addMail)

module.exports = router;