"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarBarrio = exports.updateBarrio = exports.createBarrio = exports.getBarrioById = exports.getAllBarrio = void 0;
const prisma_barrio_repository_1 = require("../infrastruture/prisma-barrio-repository");
const barrio_service_1 = require("../applitacation/barrio.service");
const repository = new prisma_barrio_repository_1.PrismaBarrioRepository();
const service = new barrio_service_1.BarrioService(repository);
const getAllBarrio = async (req, res) => {
    try {
        const result = await service.getAll();
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({ message: error.mesagge });
    }
};
exports.getAllBarrio = getAllBarrio;
const getBarrioById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await service.getId(id);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({ message: error.mesagge });
    }
};
exports.getBarrioById = getBarrioById;
const createBarrio = async (req, res) => {
    try {
        const data = req.body;
        if (!data.nombre) {
            throw new Error("nombre no puede estar bacio");
        }
        const result = await service.create(data);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.createBarrio = createBarrio;
const updateBarrio = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        if (isNaN(id)) {
            throw new Error("id no puede ser nulo");
        }
        const result = await service.update(id, data);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.updateBarrio = updateBarrio;
const eliminarBarrio = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw new Error("producto no encontrado");
        }
        const result = await service.deleteBarrio(id);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.eliminarBarrio = eliminarBarrio;
