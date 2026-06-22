"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientRepository = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
class PrismaClientRepository {
    async getAll() {
        return prisma_1.default.cliente.findMany();
    }
    async getId(id) {
        return prisma_1.default.cliente.findUnique({
            where: {
                id: id
            }
        });
    }
    async create(data) {
        return prisma_1.default.cliente.create({ data });
    }
    async update(id, data) {
        return prisma_1.default.cliente.update({
            where: {
                id: id
            },
            data: data
        });
    }
    async delete(id) {
        return prisma_1.default.cliente.delete({
            where: {
                id
            }
        });
    }
}
exports.PrismaClientRepository = PrismaClientRepository;
