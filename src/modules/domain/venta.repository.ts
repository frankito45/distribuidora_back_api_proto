import { Venta,DetalleVenta } from "@prisma/client"

export type VentaConDetalles =
    Venta & {
        detalles: DetalleVenta[];
    };

export interface VentaRepository {

    getAll(): Promise<VentaConDetalles[]>;

    getId(
        id:number
    ): Promise<VentaConDetalles | null>;

    create(
        data:any
    ): Promise<VentaConDetalles>;

    update(
        id:number,
        data:{estado:string, metodoPago:string}
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


    recalcularTotal(ventaId: number): Promise<void>;
}