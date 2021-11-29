const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos');
const {
    existeProducto, existeNombreProducto, existeCategoria
} = require('../helpers/db-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();


/**
 * {{url}}/api/productos
 */

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre',).custom(existeNombreProducto),
    check('categoria', 'No es un id de Mongo - categoria').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    esAdminRole,
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto);

module.exports = router;