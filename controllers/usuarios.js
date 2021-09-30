const { response, request } = require('express');



const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        menssage: 'get API -  controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad, id } = req.body;

    res.json({
        menssage: 'post API -  controlador',
        nombre,
        edad,
        id
    })
}

const usuariosPut = (req, res = response) => {

    const id  = req.params.id;
    res.json({
        menssage: 'put API -  controlador',
        id
    })
}

const usuariosPatch = (req, res = response) => {

    res.json({
        menssage: 'patch API -  controlador'
    })
}

const usuariosDelete = (req, res = response) => {

    res.json({
        menssage: 'delete API -  controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}