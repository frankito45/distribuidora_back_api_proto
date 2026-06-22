import { CategoriaRepository } from "../domain/categoria.repository";


export class CategoriaServices{
    constructor(
        private repository:CategoriaRepository
    ){}

    async getCategoria(){
        return this.repository.getAll()
    }

    async getCategoriaId(id:number){
        const categoria = await this.repository.getId(id)
        if(!categoria){
            throw new Error('id de categoria no encontrado')
        }
        return categoria
    }

    async createCategoria(data:any){
        if(!data.nombre){
            throw new Error('El nombre no puede estar bacio')
        }
        return this.repository.create(data)
    }

    async updateCategoria(id:number, data:any){
        const categoria = await this.repository.getId(id)

        if(!categoria){
            throw new Error('categoria no encontrado')
        }

        if(!data.nombre){
            throw new Error('El nombre no puede estar bacio')
        }

        return this.repository.update(id,data)

    }

    async deleteCategoria(id:number){
        const categoria =  await this.repository.getId(id)
        
        if (!categoria) {
            throw new Error('Categoria no encontrado')
        }

        return this.repository.delete(id)
    }

}