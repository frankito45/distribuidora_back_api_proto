import { BarrioRepository } from "../domain/barrio.repository";


export class BarrioService {
    constructor(
        private repository : BarrioRepository
    ){}

    async getAll(){
        return this.repository.getAll()
    }

    async getId(id:number){
        if (isNaN(id)) {
            throw new Error("id no puede ser nulo");
        }
        const barrio = await this.repository.getId(id)
        return barrio
    }


    async create(data:any){
        if (!data.nombre) {
            throw new Error("nombre no puede ser nulo")
        }
        const barrio  = await this.repository.create(data)
        return barrio
    }

    async update(id:number, data:any){
        if (isNaN(id)) {
            throw new Error("id nopuede ser nulo");
        }
        
        if (!data) {
            throw new Error("para actualizar tiene que contener algo")
        }
        const barrioUpdate = await this.repository.update(id, data)
        return barrioUpdate
    }

    async deleteBarrio(id:number){
        if (isNaN(id)) {
            throw new Error("id no puede ser nulo");
        }
        const barrio = await this.repository.delete(id)
        return barrio
    }
}
