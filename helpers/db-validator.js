const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol)
        throw new Error(`El rol ${role} no está registrado en BD`);
}

const emailExiste = async (correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail)
        throw new Error(`El correo ${correo} ya está registrado`);
}

const existeUsuarioPorId = async (id) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario)
        throw new Error(`No existe el id ${id}`);
}

const existeCategoria = async (id) => {

    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria)
        throw new Error(`No existe el id ${id}`);
}

const existeNombreCategoria = async (nombre = '') => {
    // Verificar si el nombre existe
    nombre = nombre.toUpperCase();
    const existeNombre = await Categoria.findOne({ nombre });
    if (existeNombre)
        throw new Error(`El nombre ${nombre} ya está registrado`);
}

const existeProducto = async (id) => {

    const existeProducto = await Producto.findById(id);
    if (!existeProducto)
        throw new Error(`No existe el id ${id}`);
}

const existeNombreProducto = async (nombre = '') => {
    // Verificar si el nombre existe
    nombre = nombre.toUpperCase();
    const existeNombre = await Producto.findOne({ nombre });
    if (existeNombre)
        throw new Error(`El nombre ${nombre} ya está registrado`);
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeNombreCategoria,
    existeProducto,
    existeNombreProducto,
    coleccionesPermitidas
}