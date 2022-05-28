const router = require('express').Router();
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validar-campos.js');
const {addPurchaseOrder} = require('../controllers/purchaseOrder');

router.post('/', [
    check("arr.*.idUser").isUUID(),
    check("arr.*.idProduct").isUUID(),
    check("arr.*.quantity").isInt(),
    validarCampos
], addPurchaseOrder);

module.exports = router;