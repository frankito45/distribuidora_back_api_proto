import { EstadoVenta, MetodoPago, Producto } from "@prisma/client";
import { ClienteRepository } from "../domain/cliente.repository";
import { ProductoRepository } from "../domain/producto.repositoy";
import { VentaRepository } from "../domain/venta.repository";
import prisma from "../../db/prisma";

type DetalleVentaInput = {
    producto:number;
    cantidad:number;
}

type VentaInput = {
    clienteId:number;
    detalles:DetalleVentaInput[];
}



export class VentaService {
    constructor(         
        private ventaRepository: VentaRepository,
        private productoRepository: ProductoRepository,
        private clienteRepository: ClienteRepository
    ){}

    async getVentas(params:any){
        return this.ventaRepository.getAll(params)
    }

    async getVentasPendientes(){
        return this.ventaRepository.getFilterPendiente()
    }

    async getcountEstado(){
        return this.ventaRepository.countEstadoPendiente()
    }

    async getVentaId(id:number){
        const venta = await this.ventaRepository.getId(id)
        
        if(!venta){
            throw new Error('venta no encontrado')
        }
        return venta
    }

    async createVenta(data:VentaInput){
        const idCliente = Number(data.clienteId)
        const cliente = await this.clienteRepository.getId(idCliente)
        if(!cliente){
            throw new Error("cliente inexistente");
            
        }
        
        return this.ventaRepository.create({
            clienteId: idCliente,
            total: 0,
            estado:"PENDIENTE",
            detalles: [],
            pagos: [],

        })

    }
    
    async cambiarEstado(id:number, estado:"PAGADA"|"CANCELADA",pago:[]){
        const venta = await this.ventaRepository.getId(id)
        if (!venta) {
            throw new Error("venta no encontrado");
            
        }

        if(venta.estado !== "PENDIENTE"){
            throw new Error("Solo pueden modificarse ventas pendientes");   
        }

        if (estado === "CANCELADA") {

            for (const detalle of venta.detalles) {
                await this.productoRepository.increment(
                detalle.productoId,
                detalle.cantidad
                );
            }

        }


        return this.ventaRepository.update(
        id,
        { estado:estado, pago:pago },
    );

    }

    async agregarProducto(ventaId: number, detalle: DetalleVentaInput) {

        const venta = await this.ventaRepository.getId(ventaId);

        if (!venta) {
            throw new Error("Venta no encontrada");
        }

        if (venta.estado !== "PENDIENTE") {
            throw new Error("Solo se pueden modificar ventas pendientes");
        }

        return this.ventaRepository.agregarProducto(ventaId, detalle);
    }

    //eliminar producto 
    async desAgregarProducto(ventaId:number,productoId:number){
        const idVenta = ventaId
        const venta = await this.ventaRepository.getId(idVenta)
        if (!venta) {
            throw new Error("Venta no encontrada");
        }
        
        if (venta.estado !== "PENDIENTE") {
        throw new Error("Solo pueden modificarse ventas pendientes");
        }


        return await this.ventaRepository.eliminarProducto(idVenta,productoId)
    }

    // filtro por dia
    async filterFecha(day:any){
        if(!day){
            throw new Error('fecha no puede ser vacio')
        }
        return await this.ventaRepository.getFilterAll(day)
    }
        

    async deleteVenta(id:number){
        const venta = await this.ventaRepository.getId(id)
        
        if(!venta){
            throw new Error('venta no encontrada')
        }
        return await this.ventaRepository.delete(id)
    }

    async agregarOferta(id:number,data:any){
        if (isNaN(id)) {
            throw new Error("ventan no encontrada ")
        }
        if (!data.oferta) {
            throw new Error("oferta no puede ser 0")
        }
        return await this.ventaRepository.crearOferta(id,data)
    }
    
    
}

