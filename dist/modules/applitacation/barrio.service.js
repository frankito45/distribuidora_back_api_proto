"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarrioService = void 0;
class BarrioService {
    constructor(repository) {
        this.repository = repository;
    }
    async getAll() {
        return this.repository.getAll();
    }
    async getId(id) {
        if (isNaN(id)) {
            throw new Error("id no puede ser nulo");
        }
        const barrio = await this.repository.getId(id);
        return barrio;
    }
    async create(data) {
        if (!data.nombre) {
            throw new Error("nombre no puede ser nulo");
        }
        const barrio = await this.repository.create(data);
        return barrio;
    }
    async update(id, data) {
        if (isNaN(id)) {
            throw new Error("id nopuede ser nulo");
        }
        if (!data) {
            throw new Error("para actualizar tiene que contener algo");
        }
        const barrioUpdate = await this.repository.update(id, data);
        return barrioUpdate;
    }
    async deleteBarrio(id) {
        if (isNaN(id)) {
            throw new Error("id no puede ser nulo");
        }
        const barrio = await this.repository.delete(id);
        return barrio;
    }
}
exports.BarrioService = BarrioService;
