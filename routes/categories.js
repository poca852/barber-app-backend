const router = require('express').Router()
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validar-campos.js');
const {getCategories, addCategorie} = require('../controllers/categories.js');

router.post('/', [
    check('categorie', 'Categorie is required').not().isEmpty().isString(),
    validarCampos
], addCategorie)

router.get('/', [
    check('categorie', 'Categorie is not valid').isString(),
], getCategories)

// router.get('/:id', [
//     check('id', 'Id is not valid').isUUID(),
// ], getCategorie)






module.exports = router;