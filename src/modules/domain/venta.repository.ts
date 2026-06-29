import { Venta,DetalleVenta } from "@prisma/client"

export type VentaConDetalles =
    Venta & {
        detalles: DetalleVenta[];
    };

export interface VentaRepository {

    getAll(
        params:{
            skip:number, 
            take:number
        }): Promise<VentaConDetalles[]>;

    getFilterAll(dato:any): Promise<VentaConDetalles[]>

    getFilterPendiente(): Promise<VentaConDetalles[]>
    
    countEstadoPendiente(): Promise<number>

    getId(
        id:number
    ): Promise<VentaConDetalles | null>;

    create(
        data:any
    ): Promise<VentaConDetalles>;

    update(
        id:number,
        data:any
    ): Promise<Venta>;

    delete(
        id:number
    ): Promise<Venta>;

    agregarDetalles(
        ventaId:number,
        detalles:{
        productoId: number;
        cantidad: number;
        precio: number;
        subtotal: number;
    }
    ): Promise<void>;

    actualizarDetalleCantidad(
        detalleId: number,
        cantidad: number,
        precio: number
    ): Promise<void>;

    eliminarProducto(
        ventaId:number,
        productoId:number
    ): Promise<any>


    recalcularTotal(ventaId: number): Promise<void>;
}