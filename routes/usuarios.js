const {Router} = require('express');
const {check} = require('express-validator');

// controllers
const { addUser,
        getUsers,
        getUser,
        putUser,
        deleteUser, 
        addRol} = require('../controllers/usuarios');

// helpers
const { verficarEmail, verificarId, existeRol, verificarRol } = require('../helpers/db-validators');

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
    check('idRol', 'rol debe ser un uuid').isUUID(),
    check('idRol').custom(verificarRol),
    validarCampos
], addUser)

// crear un nuevo rol
router.post('/rol', [
    check('rol', 'Rol is required').not().isEmpty().isString(),
    check('rol').custom(existeRol),
    validarCampos
], addRol)

// listar todos los usuarios
router.get('/', getUsers)

// listar solo un usuario que es pedido por id
router.get('/:id', [
    check('id', 'Id is not valid').isNumeric(),
    check('id').custom(verificarId),
    validarCampos
], getUser)

// actualizar un usuario
router.put('/:id', [
    check('id', 'id is not valid').isNumeric(),
    check('id').custom(verificarId),
    validarCampos
], putUser)

// eliminar un usuario, NOTA: solo le cambia el estado a false no lo elimina fisicamente 
router.delete('/:id', [
    check('id', 'Id is not valid').isNumeric(),
    check('id').custom(verificarId),
    validarCampos
], deleteUser)

module.exports = router;