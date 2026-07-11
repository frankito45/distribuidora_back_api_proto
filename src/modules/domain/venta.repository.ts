import { Venta,DetalleVenta, Prisma, EstadoVenta, Barrio } from "@prisma/client"
import prisma from "../../db/prisma";
import { VentaId, VentaInforme } from "../shared/types/venta.types";

export type VentaConDetalles =
    Venta & {
        detalles: DetalleVenta[];
    };

export interface VentaRepository  {

    getAll(
        params:{
            skip:number, 
            take:number
        }): Promise<VentaId[]>;

    getFilterAll(dato:any): Promise<VentaConDetalles[]>

    getFilterPendiente(): Promise<VentaConDetalles[]>
    
    countEstadoPendiente(): Promise<number>

    getId(
        id:number
    ): Promise<VentaId | null>;

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

    actualizarDetalleCantidad(
        detalleId: number,
        cantidad: number,
        precio: number
    ): Promise<void>;

    eliminarProducto(
        ventaId:number,
        productoId:number
    ): Promise<any>
    
    agregarProducto( 
        ventaId: number,
        detalle: {
            producto: number;
            cantidad: number;
        }):Promise<any>


    recalcularTotal(bd: Prisma.TransactionClient | typeof prisma,
        ventaId: number): Promise<void>;

    crearOferta(
    ventaId:number,
    oferta:number
    ): Promise<any>

    informe(inicio:Date,final:Date):Promise<VentaInforme[]>
}