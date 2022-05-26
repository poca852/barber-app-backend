const router = require('express').Router()
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validar-campos.js');
const {validarHora, validarImg} = require('../helpers/customValidators.js');
const {addService,getServices, getService,putService ,deleteService} = require('../controllers/service.js');
const {verificarServicio} = require("../helpers/db-validators")

router.post('/', [
    check('name', 'name is required').not().isEmpty().isString(),
    check('detail', 'detail is required').not().isEmpty().isString(),
    check('price', 'price is required' ).not().isEmpty().isFloat(),
    check('time').custom(validarHora),
    check('img').custom(validarImg),
    validarCampos
], addService)

router.get('/', [
    check('name', 'Name is not valid').isString(),
], getServices)

router.get('/:id', [
    check('id', 'Id is not valid').isUUID(),
], getService)

//modificar un servicio
router.put('/:id', [
    check('id', 'No es un id valido').isUUID(),
    check('id').custom(verificarServicio),
    validarCampos
  ], putService)
  
  // eliminar un servicio se validan dos cosas, una que sea un uuid y segundo que estemos eliminando un servicio que realmente exista
  router.delete('/:id', [
    check('id', 'No es un id valido').isUUID(),
    check('id').custom(verificarServicio),
    validarCampos
  ], deleteService)







module.exports = router;