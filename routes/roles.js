const { Router} = require('express');
const { check } = require('express-validator');
const { getRoles, getRol, postRol, putRol, deleteRol } = require('../controllers/roles');
const { existeRolByName, verificarRol } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');

const router = Router();

// listar roles
router.get('/', getRoles)

// crear roles
router.post('/', [
   check('rol', 'El rol es obligatorio').not().isEmpty(),
   check('rol').custom(existeRolByName),
   validarCampos
], postRol)

// listar un rol
router.get('/:idRol', [
   check('idRol', 'No es un id valido').isUUID(),
   check('idRol').custom(verificarRol),
   validarCampos
], getRol)

// actualizar role
router.put('/:idRol', [
   check('idRol', 'no es un id valido').isUUID(),
   check('idRol').custom(verificarRol),
   validarCampos
], putRol)

// eliminar role
router.delete('/:idRol', [
   check('idRol', 'No es un id valido').isUUID(),
   check('idRol').custom(verificarRol),
   validarCampos
], deleteRol)

module.exports = router;