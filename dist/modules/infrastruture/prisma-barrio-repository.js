"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaBarrioRepository = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
class PrismaBarrioRepository {
    async getAll() {
        return prisma_1.default.barrio.findMany({});
    }
    async getId(id) {
        return prisma_1.default.barrio.findFirst({
            where: {
                id: id
            }
        });
    }
    async create(data) {
        return prisma_1.default.barrio.create({ data });
    }
    async update(id, data) {
        return prisma_1.default.barrio.update({
            where: {
                id: id
            }, data: {
                data
            }
        });
    }
    async delete(id) {
        return prisma_1.default.barrio.delete({
            where: {
                id: id
            }
        });
    }
}
exports.PrismaBarrioRepository = PrismaBarrioRepository;
