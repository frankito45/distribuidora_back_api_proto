import { ProductoRepository } from "../domain/producto.repositoy";

export class ProductoService {
    constructor(
        private repository: ProductoRepository
    ){}

    async getProductos(){
        const result = await this.repository.getAll()
        return result
    }

    async getProductoById(id:number){
        const producto =
            await this.repository.getId(id);

        if (!producto) {
            throw new Error(
                'Producto no encontrado'
            );
        }

        return producto;
    }

    async crearProducto(data:any){
        if(!data.nombre?.trim()){
            throw new Error('el nombre no puede estar vacio')
        }
        if(data.precioCompra < 0){
            throw new Error('el precio no puede estar vacio')
        }
        if(data.precioVenta <= 0){
            throw new Error('el precio no puede estar vacio ni ser 0')
        }
        if(data.stock <= 0 ){
            throw new Error('el stock no puede estar vacio')
        }
        if(!data.categoriaId){
            throw new Error('la categoria es obligatoria')
        }

        return this.repository.create(data)
    }

    async updateProducto(id:number,data:any){
        const producto =
        await this.repository.getId(id);

    if(!producto){
        throw new Error(
            'Producto no encontrado'
        );
    }

    return this.repository.update(
        id,
        data
    );
    }

    async deleteProducto(id:number){
        const producto =
        await this.repository.getId(id);

    if(!producto){
        throw new Error(
            'Producto no encontrado'
        );
    }

    return this.repository.delete(id);
    }

    async incrementeStock(id: number, cantidad: number){
        const producto =
        await this.repository.getId(id);
        
        if(!producto){
        throw new Error(
            'Producto no encontrado'
        );
        }

        if(cantidad <= 0){
            throw new Error('el ingreso tiene que ser mayor a 0')
        }

        return this.repository.increment(id, cantidad)
    }

    async decrementStock(id: number, cantidad: number){
        const producto = await this.repository.getId(id)

        if(!producto){
            throw new Error('producto no encontrado')
        }
        if(producto.stock < cantidad){
            throw new Error('Catidad insuficiente')
        }

        return this.repository.decrement(id, cantidad)
         
    }

    async buscarProductos(query: string) {

    if (!query.trim()) {
        return [];
    }

    return this.repository.buscarProductos(query);
    }
    

    
}