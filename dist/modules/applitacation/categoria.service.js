"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaServices = void 0;
class CategoriaServices {
    constructor(repository) {
        this.repository = repository;
    }
    async getCategoria() {
        return this.repository.getAll();
    }
    async getCategoriaId(id) {
        const categoria = await this.repository.getId(id);
        if (!categoria) {
            throw new Error('id de categoria no encontrado');
        }
        return categoria;
    }
    async createCategoria(data) {
        if (!data.nombre) {
            throw new Error('El nombre no puede estar bacio');
        }
        return this.repository.create(data);
    }
    async updateCategoria(id, data) {
        const categoria = await this.repository.getId(id);
        if (!categoria) {
            throw new Error('categoria no encontrado');
        }
        if (!data.nombre) {
            throw new Error('El nombre no puede estar bacio');
        }
        return this.repository.update(id, data);
    }
    async deleteCategoria(id) {
        const categoria = await this.repository.getId(id);
        if (!categoria) {
            throw new Error('Categoria no encontrado');
        }
        return this.repository.delete(id);
    }
}
exports.CategoriaServices = CategoriaServices;
