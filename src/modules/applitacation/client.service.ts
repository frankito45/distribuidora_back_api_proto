import { ClienteRepository } from "../domain/cliente.repository"; 

export class ClienteService {
    constructor (
        private repository: ClienteRepository
    ) {}

    async getClients() {
        return this.repository.getAll()
    }

    async createClient(data:any) {
        if(!data.nombre) {
            throw new Error('nombre requerido')
        }

        return this.repository.create(data)
    }

    async getClientById(id:number) {
        const cliente = await this.repository.getId(id)
        if(!cliente) {
            throw new Error('Id de cliente no encontrado ')
        }

        return cliente
    }

    async updateCliente(id:number,data:any){

        const cliente  = await this.repository.getId(id)
        if(!cliente) {
            throw new Error('Clienlte no encontrado')
        }
        return await this.repository.update(id,data)
    }

    async deleteCliente(id:number){
        const cliente = await this.repository.getId(id)

        if(!cliente) {
            throw new Error('Cliente no encontrado')
        }

        return await this.repository.delete(id)
    }
}

