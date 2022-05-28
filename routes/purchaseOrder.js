const router = require('express').Router();
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validar-campos.js');
const {addPurchaseOrder} = require('../controllers/purchaseOrder');

router.post('/', [ //Validacion da error porque en un "arreglo" de objetos el body
   /* check('idUser').isUUID(),
    check('idProduct').isUUID(),
    check('quantity').isInt(),
    validarCampos*/
], addPurchaseOrder);

module.exports = router;