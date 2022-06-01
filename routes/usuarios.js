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
const {validarCampos, validarJWT} = require('../middlewares');

const router = Router();

// localhost:8080/api/users

// crear un usuario
router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('email').custom(verficarEmail),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'password is required').isLength({min: 6}),
    // check('idRol', 'rol debe ser un uuid').isUUID(),
    check('rol').custom(checkRolByName),
    validarCampos
], addUser)

// listar todos los usuarios
router.get('/', getUsers)

// listar solo un usuario que es pedido por id
router.get('/:id', [
    check('id', 'Id is not valid').isNumeric(),
    check('id').custom(verificarId),
    validarCampos
], getUser)

// actualizar un usuario
router.put('/:idUser', [
    check('id', 'no es un id valido').isUUID(),
    check('id').custom(verificarId),
    validarCampos
], putUser)

// eliminar un usuario, NOTA: solo le cambia el estado a false no lo elimina fisicamente 
router.delete('/:idUser', [
    check('id', 'No es un id valido').isUUID(),
    check('id').custom(verificarId),
    validarCampos
], deleteUser)

module.exports = router;