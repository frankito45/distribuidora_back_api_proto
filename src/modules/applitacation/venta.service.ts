
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

    async agregarProducto(ventaId: number, detalles: DetalleVentaInput) {
    return await prisma.$transaction(async (tx) => {

        const venta = await tx.venta.findUnique({
        where: { id: ventaId },
        include: { detalles: true }
        });

        if (!venta) throw new Error("venta no encontrado");

        if (venta.estado !== "PENDIENTE") {
        throw new Error("Solo se pueden modificar ventas pendientes");
        }

        const producto = await tx.producto.findUnique({
        where: { id: detalles.producto }
        });

        if (!producto) throw new Error("producto no encontrado");

        if (detalles.cantidad <= 0) {
        throw new Error("la cantidad debe ser mayor a cero");
        }

        if (producto.stock < detalles.cantidad) {
        throw new Error(`Stock insuficiente. Disponible: ${producto.stock}`);
        }

        const subtotalNuevo = producto.precioVenta * detalles.cantidad;

        const detalleExistente = venta.detalles.find(
        d => d.productoId === producto.id
        );

        let cambioTotal = 0;

        // 1. crear o actualizar detalle
        if (detalleExistente) {

        const nuevaCantidad = detalleExistente.cantidad + detalles.cantidad;
        const nuevoSubtotal = nuevaCantidad * producto.precioVenta;

        await tx.detalleVenta.update({
            where: { id: detalleExistente.id },
            data: {
            cantidad: nuevaCantidad,
            subtotal: nuevoSubtotal
            }
        });

        cambioTotal = subtotalNuevo; // solo sumás lo nuevo

        } else {

        await tx.detalleVenta.create({
            data: {
            ventaId,
            productoId: producto.id,
            cantidad: detalles.cantidad,
            precio: producto.precioVenta,
            subtotal: subtotalNuevo
            }
        });

        cambioTotal = subtotalNuevo;
        }

        // 2. actualizar stock (ATÓMICO)
        await tx.producto.update({
        where: { id: producto.id },
        data: {
            stock: {
            decrement: detalles.cantidad
            }
        }
        });

        // 3. actualizar total incremental (MUCHO MÁS RÁPIDO)
        await tx.venta.update({
        where: { id: ventaId },
        data: {
            total: {
            increment: cambioTotal
            }
        }
        });

        // 4. devolver venta actualizada
        return tx.venta.findUnique({
        where: { id: ventaId },
        include: {
            cliente: true,
            detalles: { include: { producto: true } }
        }
        });
    });
    }
    //eliminar producto 
    async desAgregarProducto(ventaId:number,productoId:number){
        const idVenta = ventaId
        const venta = await this.ventaRepository.getId(idVenta)
        if (!venta) {
            throw new Error("Venta no encontrada");
        }
        console.log(venta.estado)


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
    
    
}

