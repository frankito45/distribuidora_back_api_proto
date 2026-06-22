"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoria = exports.updataCategoria = exports.crearCategoria = exports.getCategoriaId = exports.getCategoria = void 0;
const prisma_Categoria_repository_1 = require("../infrastruture/prisma-Categoria.repository");
const categoria_service_1 = require("../applitacation/categoria.service");
const repository = new prisma_Categoria_repository_1.PrismaCategoriaRepository();
const service = new categoria_service_1.CategoriaServices(repository);
const getCategoria = async (req, res) => {
    const result = await service.getCategoria();
    return res.json(result);
};
exports.getCategoria = getCategoria;
const getCategoriaId = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Id Invalido'
            });
        }
        const result = await service.getCategoriaId(id);
        res.send(200).json(result);
    }
    catch (error) {
        res.send(400).json({
            message: error.message
        });
    }
};
exports.getCategoriaId = getCategoriaId;
const crearCategoria = async (req, res) => {
    try {
        const data = req.body;
        if (!data.nombre) {
            throw new Error("categoria nombre no pudede ser vacia");
        }
        const result = await service.createCategoria(data);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.crearCategoria = crearCategoria;
const updataCategoria = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                message: 'Id no encontrado'
            });
        }
        const data = req.body;
        const result = await service.updateCategoria(id, data);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.updataCategoria = updataCategoria;
const deleteCategoria = async (req, res) => {
    const id = Number(req.params.id);
    try {
        if (isNaN(id)) {
            res.status(400).json({
                message: 'Categoria Invalida'
            });
        }
        const result = await service.deleteCategoria(id);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.deleteCategoria = deleteCategoria;
