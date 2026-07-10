import { EstadoVenta, MetodoPago, Producto, Venta } from "@prisma/client";
import { ClienteRepository } from "../domain/cliente.repository";
import { ProductoRepository } from "../domain/producto.repositoy";
import { VentaConDetalles, VentaRepository } from "../domain/venta.repository";
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
        if (isNaN(data.oferta)) {
            throw new Error("oferta no puede ser 0")
        }
        return await this.ventaRepository.crearOferta(id,data.oferta)
    }    
    

    async informexDia(day:string){
        console.log('data:',day)
    
        const [year, month, dayOfMonth] = day.split("-").map(Number);

    const inicio = new Date(year, month - 1, dayOfMonth, 0, 0, 0, 0);
    const final = new Date(year, month - 1, dayOfMonth, 23, 59, 59, 999);


        const ventas =  await this.ventaRepository.informe(inicio,final)

        const totalVentas = ventas.reduce(
                (total, venta) => total + venta.total,
                0
            );

            const cantidadVentas = ventas.length;

            const cantidadProductos = ventas.reduce(
                (total, venta) =>
                    total +
                    venta.detalles.reduce(
                        (sub, detalle) => sub + detalle.cantidad,
                        0
                    ),
                0
            );

            const costo = ventas.reduce(
                (total, venta) =>
                    total +
                    venta.detalles.reduce(
                        (sub, detalle) =>
                            sub + (detalle.producto.precioCompra * detalle.cantidad),
                        0
                    ),
                0
            );

            const ganancia = totalVentas - costo;

            const efectivo = ventas.reduce(
                (total, venta) =>
                    total +
                    venta.pagos
                        .filter(p => p.metodo === "EFECTIVO")
                        .reduce((sub, pago) => sub + pago.monto, 0),
                0
            );

            const transferencia = ventas.reduce(
                (total, venta) =>
                    total +
                    venta.pagos
                        .filter(p => p.metodo === "TRANSFERENCIA")
                        .reduce((sub, pago) => sub + pago.monto, 0),
                0
            );

            const cuentaCorriente = ventas.reduce(
                (total, venta) =>
                    total +
                    venta.pagos
                        .filter(p => p.metodo === "CUENTA_CORRIENTE")
                        .reduce((sub, pago) => sub + pago.monto, 0),
                0
            );

            return {
                cantidadVentas,
                cantidadProductos,
                totalVentas,
                costo,
                ganancia,
                efectivo,
                transferencia,
                cuentaCorriente,
                ventas
            };
        }


}   
    

