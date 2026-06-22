"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProductoRepository = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
class PrismaProductoRepository {
    async getAll() {
        return prisma_1.default.producto.findMany({
            include: {
                categoria: true,
                proveedor: true
            }
        });
    }
    async getId(id) {
        return prisma_1.default.producto.findUnique({
            where: {
                id: id
            },
            include: {
                categoria: true,
                proveedor: true
            }
        });
    }
    async create(data) {
        return prisma_1.default.producto.create({ data });
    }
    async update(id, data) {
        return prisma_1.default.producto.update({
            where: {
                id: id
            },
            data: data
        });
    }
    async delete(id) {
        return prisma_1.default.producto.delete({
            where: {
                id: id
            }
        });
    }
    async increment(id, catntidad) {
        return prisma_1.default.producto.update({
            where: {
                id: id
            },
            data: {
                stock: {
                    increment: catntidad
                }
            }
        });
    }
    async decrement(id, catntidad) {
        return prisma_1.default.producto.update({
            where: { id },
            data: {
                stock: {
                    decrement: catntidad
                }
            }
        });
    }
    // GET /api/productos?query=texto
    async buscarProductos(query) {
        return prisma_1.default.producto.findMany({
            where: {
                nombre: {
                    contains: query,
                    mode: 'insensitive'
                }
            },
            take: 20
        });
    }
}
exports.PrismaProductoRepository = PrismaProductoRepository;
