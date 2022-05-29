const {Router} = require('express');
const {check} = require('express-validator');

// controllers
const {login, renew, signGoogle, auth0} = require('../controllers/auth');

// helpers
const { existeEmail, existeRolByName } = require('../helpers/db-validators');

// middlewares
const { validarCampos, validarJWT } = require('../middlewares')

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(existeEmail),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login)

router.post('/google', [
    check('id_token', 'el id token es obligatorio').not().isEmpty(),
    validarCampos
], signGoogle)

router.get('/renew', [
    validarJWT
], renew)

router.post('/auth0', [
    check('email', 'No es un email valido').isEmail(),
    check('name', 'el name es obligatorio').not().isEmpty(),
    check('email_verified', 'El campo verified es obligatorio').isBoolean(),
    check('rol').custom(existeRolByName),
    validarCampos
], auth0)

module.exports = router;