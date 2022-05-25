const router = require('express').Router()
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validar-campos.js');
const {validarImg} = require('../helpers/customValidators.js');
const {addProduct, getProduct, getProducts} = require('../controllers/products.js');

router.post('/', [
    check('name', 'name is required').not().isEmpty().isString(),
    check('stock', 'stock is required').not().isEmpty().isInt(),
    check('price', 'price is required' ).not().isEmpty().isFloat(),
   check("idCategorie","idCategorie is required").not().isEmpty().isUUID(),
    check('img').custom(validarImg),
    validarCampos
], addProduct)

router.get('/', [
    check('name', 'Name is not valid').isString(),
], getProducts)

router.get('/:id', [
    check('id', 'Id is not valid').isUUID(),
], getProduct)






module.exports = router;