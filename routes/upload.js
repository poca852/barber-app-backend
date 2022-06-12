const {Router} = require('express');
const {check} = require('express-validator');
const { uploadImg } = require('../controllers/upload');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir, validarCampos, validarJWT } = require('../middlewares')

const router = Router();

router.post('/:coleccion/:id', [
  validarJWT,
  validarArchivoSubir,
  check('id', 'No es un id valido').isUUID(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos', 'servicios'])),
  validarCampos
], uploadImg)

module.exports = router