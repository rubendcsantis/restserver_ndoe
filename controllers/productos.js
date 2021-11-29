const { response } = require("express");
const { Producto, Categoria } = require("../models");


const obtenerProductos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre -_id')
            .populate('categoria', 'nombre -_id')
    ]);

    res.json({
        total,
        productos
    })
}


const obtenerProducto = async (req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre -_id')
        .populate('categoria', 'nombre -_id');

    res.json(producto);
}


const crearProducto = async (req, res = response) => {

    const { estado, ususario, ...body } = req.body;

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = await new Producto(data);

    // Guardar en DB
    await producto.save();

    res.status(200).json(producto);
}

const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.json(producto)
}

const borrarProducto = async (req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(producto);
}



module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}