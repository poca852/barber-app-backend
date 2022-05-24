const router = require('express').Router()
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validar-campos.js');
const {validarHora, validarImg} = require('../helpers/customValidators.js');
const {addService} = require('../controllers/service.js');

router.post('/', [
    check('name', 'name is required').not().isEmpty().isString(),
    check('detail', 'detail is required').not().isEmpty().isString(),
    check('price', 'price is required' ).not().isEmpty().isFloat(),
    /*check('time', 'time is required').isDate(),
    check('time').custom(validarHora),
    check('img').custom((img,next)=>validarImg(img,next)),
    */
    validarCampos
], addService)

module.exports = router;