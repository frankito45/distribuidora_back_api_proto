
import { Producto } from "@prisma/client";
import { ClienteRepository } from "../domain/cliente.repository";
import { ProductoRepository } from "../domain/producto.repositoy";
import { VentaRepository } from "../domain/venta.repository";

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
            detalles: [] 
        })

    }
    
    async cambiarEstado(id:number, estado:"PAGADA"|"CANCELADA",metodoPago: "EFECTIVO" | "TRANSFERENCIA" | "TARJETA"){
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

        if (!["EFECTIVO", "TRANSFERENCIA", "TARJETA"].includes(metodoPago)) {
            throw new Error("Método de pago inválido");
        }

        return this.ventaRepository.update(
        id,
        { estado:estado, metodoPago:metodoPago },
    );

    }

    async agregarProducto(ventaId:number,detalles:DetalleVentaInput){
        const venta = await this.ventaRepository.getId(ventaId)

        if (!venta) {
            throw new Error("venta no encontrado");
            
        }
        if(venta.estado !== "PENDIENTE"){
            throw new Error(
                "Solo se pueden modificar ventas pendientes"
            );
        }

        const producto = await this.productoRepository.getId(detalles.producto)

        if (!producto) {
            throw new Error("producto no encontrado");
        }
       if (detalles.cantidad <= 0) {
            throw new Error(
            "la cantidad debe ser mayor a cero"
            );
        }

          // Validar stock disponible
        if (producto.stock < detalles.cantidad) {
            throw new Error(
            `Stock insuficiente. Disponible: ${producto.stock}`
            );
        }

        // 
        const detalleExistente = venta.detalles.find(
            d => d.productoId === producto.id
        );
        if (detalleExistente) {
            // 4A. actualizar cantidad
            await this.ventaRepository.actualizarDetalleCantidad(
                detalleExistente.id,
                detalleExistente.cantidad + detalles.cantidad,
                producto.precioVenta
            );
            
        } else {
            // 4B. crear nuevo detalle
            await this.ventaRepository.agregarDetalles(ventaId, {
                productoId: producto.id,
                cantidad: detalles.cantidad,
                precio: producto.precioVenta,
                subtotal: producto.precioVenta * detalles.cantidad
            });
        }
        
        // Reservar stock inmediatamente
        await this.productoRepository.decrement(
            producto.id,
            detalles.cantidad
        );

        await this.ventaRepository.recalcularTotal(
            ventaId
        );

        return await this.ventaRepository.getId(
            ventaId
        );
    }      
        
        
        
    
    async deleteVenta(id:number){
        const venta = await this.ventaRepository.getId(id)
        
        if(!venta){
            throw new Error('venta no encontrada')
        }
        return await this.ventaRepository.delete(id)
    }
    
    
}

