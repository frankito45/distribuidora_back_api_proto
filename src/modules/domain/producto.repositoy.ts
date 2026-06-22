import { Producto } from "@prisma/client"

export interface ProductoRepository {
    
    getAll():Promise<any[]>
    getId(data:number):Promise<Producto>

    create(data:any):Promise<any>

    update(id:number,data:any):Promise<any>

    delete(id:number):Promise<any>

    increment(id:number,catntidad: number):Promise<any>
    decrement(id:number,catntidad: number):Promise<any>

    buscarProductos(query: string):Promise<Producto[]>

}

// interface Producto{
//   id              :number,
//   nombre          :string,
//   descripcion?    :string,
//   codigoBarras?   :string     
//   precioCompra    :number,
//   precioVenta     :number
//   stock           :number        
//   activo          :boolean   
//   createdAt       :string   
//   categoriaId     :number
//   proveedorId?    :number
//   detalleVentas:  []
// }