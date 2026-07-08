"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
class ClienteService {
    constructor(repository) {
        this.repository = repository;
    }
    async getClients() {
        return this.repository.getAll();
    }
    async getFilterBarrio(data) {
        return this.repository.getFiterBarrio(data);
    }
    async createClient(data) {
        if (!data.nombre) {
            throw new Error('nombre requerido');
        }
        return this.repository.create(data);
    }
    async getClientById(id) {
        const cliente = await this.repository.getId(id);
        if (!cliente) {
            throw new Error('Id de cliente no encontrado ');
        }
        return cliente;
    }
    async updateCliente(id, data) {
        const cliente = await this.repository.getId(id);
        if (!cliente) {
            throw new Error('Clienlte no encontrado');
        }
        return await this.repository.update(id, data);
    }
    async deleteCliente(id) {
        const cliente = await this.repository.getId(id);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }
        return await this.repository.delete(id);
    }
}
exports.ClienteService = ClienteService;
