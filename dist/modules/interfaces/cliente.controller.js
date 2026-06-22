"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCliente = exports.updateCliente = exports.getClienteById = exports.createCliente = exports.getClientes = void 0;
const prisma_Cliente_repository_1 = require("../infrastruture/prisma-Cliente.repository");
const client_service_1 = require("../applitacation/client.service");
const repository = new prisma_Cliente_repository_1.PrismaClientRepository();
const service = new client_service_1.ClienteService(repository);
const getClientes = async (req, res) => {
    const result = await service.getClients();
    return res.json(result);
};
exports.getClientes = getClientes;
const createCliente = async (req, res) => {
    const result = await service.createClient(req.body);
    try {
        res.send(200).json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.createCliente = createCliente;
const getClienteById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Id inválido'
            });
        }
        const result = await service.getClientById(id);
        return res.json(result);
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};
exports.getClienteById = getClienteById;
const updateCliente = async (req, res) => {
    console.log('sin');
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Id inválido'
            });
        }
        const data = req.body;
        console.log(id, data);
        const result = await service.updateCliente(id, data);
        return res.json(result);
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};
exports.updateCliente = updateCliente;
const deleteCliente = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Id inválido'
            });
        }
        const result = await service.deleteCliente(id);
        return res.json(result);
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};
exports.deleteCliente = deleteCliente;
