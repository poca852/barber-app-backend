const router = require('express').Router()
const {check} = require('express-validator');
const {validarCampos, validarJWT, esAdminRol} = require('../middlewares');
const {validarImg} = require('../helpers/customValidators.js');
const {addProduct, getProduct, getProducts, putProduct, deleteProduct, patchProducto} = require('../controllers/products.js');
const { verficarCategoria, verificarProduct } = require('../helpers/db-validators.js');

router.post('/', [
    validarJWT,
    esAdminRol,
    check('name', 'name is required').not().isEmpty().isString(),
    check("detail","detail is required").not().isEmpty().isString(),
    //check('stock', 'stock is required').not().isEmpty().isInt(),
//consu agrego esta verificacion para que el stock no pueda ser menos a 0
    check('stock', 'stock must be an integer greater than -1').isInt({ gt: -1 }),
    check('price', 'price is required' ).not().isEmpty().isFloat(),
    check("categoria","La categoria es obligatoria").not().isEmpty(),
    check("categoria").custom(verficarCategoria),
    // david agrego esta verificacion, a la hora que se cree un nuevo producto verifico que la categoria si exista realmente
    // check('img').custom(validarImg),
    validarCampos
], addProduct)

router.get('/', [
    check('name', 'Name is not valid').isString(),
], getProducts)

router.get('/:id', [
    check('id', 'Id is not valid').isUUID(),
], getProduct)

// actualizar un producto, 2 validaciones una que sea un uuid y la otra que estemos editando un producto que exista
router.put('/:idProduct', [
    validarJWT,
    esAdminRol,
    check('idProduct', 'No es un id valido').isUUID(),
    check('idProduct').custom(verificarProduct),
    validarCampos
], putProduct)

// eliminar un producto se validan dos cosas, una que sea un uuid y segundo que estemos eliminando un producto que realmente exista
router.delete('/:idProduct', [
    validarJWT,
    esAdminRol,
    check('idProduct', 'No es un id valido').isUUID(),
    check('idProduct').custom(verificarProduct),
    validarCampos
], deleteProduct)

router.patch('/:idProduct', [
    validarJWT,
    esAdminRol,
    check('idProduct', 'No es un id valido').isUUID(),
    check('idProduct').custom(verificarProduct),
    validarCampos
], patchProducto)



module.exports = router;