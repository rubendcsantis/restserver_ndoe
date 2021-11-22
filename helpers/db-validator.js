const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol)
        throw new Error(`El rol ${role} no está registrado en BD`);
}

const emailExiste = async (correo = '') => {
    // Verificar si el correo existe
    const existeEmail =  await Usuario.findOne({ correo });
    if (existeEmail)
        throw new Error ( `El correo ${ correo } ya está registrado`);
}

const existeUsuarioPorId = async( id ) => {
    
    // Verificar si el correo existe
    const existeUsuario =  await Usuario.findById( id );
    if (!existeUsuario)
        throw new Error ( `No existe el id ${ id }`);
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}