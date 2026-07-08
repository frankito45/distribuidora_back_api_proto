"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagar = void 0;
const pago_service_1 = require("../applitacation/pago.service");
const prisma_Pago_repository_1 = require("../infrastruture/prisma-Pago.repository");
const prisma_Venta_repository_1 = require("../infrastruture/prisma-Venta.repository");
const repositoryPago = new prisma_Pago_repository_1.PrismaPagoRepository();
const repositoryVenta = new prisma_Venta_repository_1.PrismaVentaRepository();
const service = new pago_service_1.PagoService(repositoryPago, repositoryVenta);
const pagar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw new Error("venta no puede ser nula");
        }
        const pagos = req.body;
        console.log(req.body);
        if (!pagos) {
            throw new Error("Los pagos no pueden ser nulos");
        }
        const result = await service.crearPago(id, pagos);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.pagar = pagar;
