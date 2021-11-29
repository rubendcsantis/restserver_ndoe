

const dbValidator  = require('./db-validator');
const generarJWT   = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArvhivo = require('./subir-archivo');


module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...subirArvhivo
}