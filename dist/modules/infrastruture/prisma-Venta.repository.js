"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaVentaRepository = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
class PrismaVentaRepository {
    async getAll() {
        return prisma_1.default.venta.findMany({
            include: {
                cliente: true,
                detalles: {
                    include: {
                        producto: true
                    }
                }
            }
        });
    }
    async getId(id) {
        return prisma_1.default.venta.findUnique({
            where: {
                id
            },
            include: {
                cliente: true,
                detalles: {
                    include: {
                        producto: true
                    }
                }
            }
        });
    }
    async create(data) {
        return prisma_1.default.venta.create({
            data: {
                clienteId: data.clienteId,
                total: data.total,
                estado: data.estado,
                detalles: {
                    create: data.detalles
                }
            },
            include: {
                detalles: true
            }
        });
    }
    async update(id, data) {
        return prisma_1.default.venta.update({
            where: {
                id
            },
            data: data
        });
    }
    async delete(id) {
        return prisma_1.default.venta.delete({
            where: {
                id
            }
        });
    }
    async agregarDetalles(ventaId, detalle) {
        await prisma_1.default.detalleVenta.create({
            data: {
                ventaId,
                productoId: detalle.productoId,
                cantidad: detalle.cantidad,
                precio: detalle.precio,
                subtotal: detalle.subtotal
            }
        });
    }
    async actualizarDetalleCantidad(detalleId, cantidad, precio) {
        await prisma_1.default.detalleVenta.update({
            where: { id: detalleId },
            data: {
                cantidad,
                subtotal: cantidad * precio
            }
        });
    }
    async recalcularTotal(ventaId) {
        const detalles = await prisma_1.default.detalleVenta.findMany({
            where: { ventaId }
        });
        const total = detalles.reduce((acc, d) => acc + d.subtotal, 0);
        await prisma_1.default.venta.update({
            where: { id: ventaId },
            data: { total }
        });
    }
}
exports.PrismaVentaRepository = PrismaVentaRepository;
