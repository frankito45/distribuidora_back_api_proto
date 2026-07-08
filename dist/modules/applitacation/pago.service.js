"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagoService = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
class PagoService {
    constructor(pagoRepository, ventaRepository) {
        this.pagoRepository = pagoRepository;
        this.ventaRepository = ventaRepository;
    }
    async crearPago(ventaId, pagos) {
        const venta = await this.ventaRepository.getId(ventaId);
        if (!venta) {
            throw new Error("La venta no existe");
        }
        if (venta.estado !== "PENDIENTE") {
            throw new Error("La venta ya fue procesada");
        }
        if (pagos.length === 0) {
            throw new Error("Debe ingresar al menos un pago");
        }
        const totalPagado = pagos.reduce((total, pago) => total + pago.monto, 0);
        if (Math.abs(totalPagado - venta.total) > 0.01) {
            throw new Error("El total de los pagos no coincide con el total de la venta");
        }
        await prisma_1.default.$transaction(async (tx) => {
            for (const pago of pagos) {
                await this.pagoRepository.create(tx, ventaId, pago);
            }
            await tx.venta.update({
                where: {
                    id: ventaId
                },
                data: {
                    estado: "PAGADA"
                }
            });
        });
        return this.ventaRepository.getId(ventaId);
    }
}
exports.PagoService = PagoService;
