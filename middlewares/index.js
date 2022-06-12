const validarCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const esAdminRol = require('./esAdminRol');
const validarArchivoSubir = require('./validar-archivo');

module.exports = {
    validarCampos,
    validarJWT,
    esAdminRol,
    validarArchivoSubir
}