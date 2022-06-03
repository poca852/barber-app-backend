const {Router} = require('express');
const {check} = require('express-validator');

// controllers
const { addUser,
        getUsers,
        getUser,
        putUser,
        deleteUser } = require('../controllers/usuarios');

// helpers
const { verficarEmail, verificarId, existeRol, existeRolByName, checkRolByName } = require('../helpers/db-validators');

// middlewares
const {validarCampos, validarJWT, esAdminRol} = require('../middlewares');

const router = Router();

// localhost:8080/api/users

// crear un usuario
router.post('/', [
    check('email', 'No es un email valido').isEmail(),
    check('email').custom(verficarEmail),
    check('name', 'Nombre requerido').not().isEmpty(),
    check('password', 'La contraseña tiene que tener minimo 6 caracteres').isLength({min: 6}),
    check('rol').custom(checkRolByName),
    validarCampos
], addUser)

// listar todos los usuarios
router.get('/', [
    validarJWT,
    validarCampos
], getUsers)

// listar solo un usuario que es pedido por id
router.get('/:id', [
    validarJWT,
    check('id', 'Id is not valid').isUUID(),
    check('id').custom(verificarId),
    validarCampos
], getUser)

// actualizar un usuario
router.put('/:idUser', [
    validarJWT,
    check('id', 'no es un id valido').isUUID(),
    check('id').custom(verificarId),
    validarCampos
], putUser)

// eliminar un usuario, NOTA: solo le cambia el estado a false no lo elimina fisicamente 
router.delete('/:idUser', [
    validarJWT,
    check('id', 'No es un id valido').isUUID(),
    check('id').custom(verificarId),
    validarCampos
], deleteUser)

module.exports = router;
