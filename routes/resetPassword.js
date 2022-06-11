const  router = require('express').Router();
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos.js');
const {resetPasswordMail,resetPassword} = require('../controllers/resetPassword.js');

router.post('/', [
    check('email', 'El email es obligatorio').isEmail().notEmpty(),
    validarCampos
], resetPasswordMail);

router.post('/confirmation', [
    check('idUser', 'El id es obligatorio').isUUID().notEmpty(),
    validarCampos
], resetPassword);

module.exports = router;