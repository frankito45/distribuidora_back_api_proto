"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarProducto = exports.deleteProducto = exports.updateProducto = exports.increment = exports.createProducto = exports.getProductoById = exports.getProductos = void 0;
const producto_service_1 = require("../applitacation/producto.service");
const prisma_Producto_repository_1 = require("../infrastruture/prisma-Producto.repository");
const repository = new prisma_Producto_repository_1.PrismaProductoRepository();
const service = new producto_service_1.ProductoService(repository);
const getProductos = async (req, res) => {
    const result = await service.getProductos();
    return res.json(result);
};
exports.getProductos = getProductos;
const getProductoById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Id inválido'
            });
        }
        const result = await service.getProductoById(id);
        return res.json(result);
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};
exports.getProductoById = getProductoById;
const createProducto = async (req, res) => {
    try {
        const data = req.body;
        const result = await service.crearProducto(data);
        return res.status(201).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error
        });
    }
};
exports.createProducto = createProducto;
const increment = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        if (isNaN(id)) {
            throw new Error("id no puede ser nulo");
        }
        const result = await service.incrementeStock(id, data);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({
            mesagge: error.message
        });
    }
};
exports.increment = increment;
const updateProducto = async (req, res) => {
    try {
        console.log('resp');
        const id = Number(req.params.id);
        const data = req.body;
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Id inválido'
            });
        }
        const result = await service.updateProducto(id, data);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.updateProducto = updateProducto;
const deleteProducto = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Id inválido'
            });
        }
        const result = await service.deleteProducto(id);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.deleteProducto = deleteProducto;
const buscarProducto = async (req, res) => {
    const query = String(req.query.query);
    if (!query) {
        return res.status(400).json({
            message: 'query es obligatorio'
        });
    }
    const productos = await service.buscarProductos(query);
    res.json(productos);
};
exports.buscarProducto = buscarProducto;
