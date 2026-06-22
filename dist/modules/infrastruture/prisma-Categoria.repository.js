"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCategoriaRepository = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
class PrismaCategoriaRepository {
    async getAll() {
        return prisma_1.default.categoria.findMany({
            include: {
                productos: true
            }
        });
    }
    async getId(id) {
        return prisma_1.default.categoria.findFirst({
            where: {
                id: id
            },
            include: {
                productos: true
            }
        });
    }
    async create(data) {
        return prisma_1.default.categoria.create({ data });
    }
    async update(id, data) {
        return prisma_1.default.categoria.update({
            where: {
                id: id
            },
            data: {
                data
            }
        });
    }
    async delete(id) {
        return prisma_1.default.categoria.delete({
            where: {
                id: id
            }
        });
    }
}
exports.PrismaCategoriaRepository = PrismaCategoriaRepository;
