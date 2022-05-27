// express
const {Router} = require('express');
const {check} = require('express-validator');
// controllers
const { postEmployee, getEmployees, getEmployee, putEmployee, deleteEmployee } = require('../controllers/employee');
// helpers
const { existeEmploye, existeEmployeById } = require('../helpers/db-validators');
// middlewares
const {validarCampos} = require('../middlewares');

const router = Router();

// crear employee
router.post('/', [
   check('name', 'El nombre es requerido').not().isEmpty(),
   check('name').custom(existeEmploye),
   validarCampos
], postEmployee);

// obtener todos los empleados o buscar uno en particular
router.get('/', getEmployees);

// obetener un empleado por id
router.get('/:idEmployee', [
   check('idEmployee', 'no es un id valido').isUUID(),
   check('idEmployee').custom(existeEmployeById),
   validarCampos
], getEmployee);

// actualizar un empleado
router.put('/:idEmployee', [
   check('idEmployee', 'no es un id valido').isUUID(),
   check('idEmployee').custom(existeEmployeById),
   validarCampos
], putEmployee);

// eliminar un empleado
router.delete('/:idEmployee', [
   check('idEmployee', 'el id no es valido').isUUID(),
   check('idEmployee').custom(existeEmployeById),
   validarCampos
], deleteEmployee);

module.exports = router;