const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categorias');
const {
    existeCategoria, existeNombreCategoria
} = require('../helpers/db-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();


/**
 * {{url}}/api/catogorias
 */

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoria);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeNombreCategoria),
    // check('usuario').custom(esRoleValido),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria);

module.exports = router;