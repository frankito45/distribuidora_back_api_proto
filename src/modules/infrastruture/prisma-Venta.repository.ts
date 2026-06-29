import { EstadoVenta, Venta } from "@prisma/client";
import prisma from "../../db/prisma";
import { VentaRepository } from "../domain/venta.repository";
import { promises } from "node:dns";

export class PrismaVentaRepository implements VentaRepository{
    
    async getAll(params: {skip:number,take:number}) {
        return prisma.venta.findMany({
            skip:params.skip,
            take:params.take,
            include: {
                
                cliente: true,
                detalles: {
                    include: {
                        producto: true
                    }
                }
            },
            orderBy: { id: "asc" }
        });
    }
    // obtener por dia
    async getFilterAll(dato:any){
        const inicio = new Date(dato);
        inicio.setHours(0,0,0,0)
        const fin = new Date(dato);
        fin.setHours(23,59,59,999)
        return prisma.venta.findMany({
            where:{
                fecha: {
                    gte: inicio,
                    lt: fin
                }
            },
            include:{
                cliente:true,
                detalles:{
                    include: {
                        producto:true
                    }
                }
            },
            orderBy: {fecha: "asc"}                
        })
    }
    // 
    async getFilterPendiente(){
        return prisma.venta.findMany({
            where:{
                estado: "PENDIENTE"
            },
            include:{
                cliente:true,
                detalles:{
                    include: {
                        producto:true
                    }
                }
            }                
        })
    }

    async countEstadoPendiente(){
        return prisma.venta.count({
            where: {estado:"PENDIENTE"}
        })
    }



    async getId(id: number) {
        return prisma.venta.findUnique({
            where: {
                id
            },
            include: {
                cliente: true,
                detalles: {
                    include: {
                        producto: true
                    }
                }
            }
        });
    }

    async create(data:any){

        return prisma.venta.create({
            data:{
                clienteId:data.clienteId,
                total:data.total,
                estado:data.estado,

                detalles:{
                    create:data.detalles
                }
            },
            include:{
                detalles:true
            }
        });
    }

    async update(id: number, data: any): Promise<Venta> {
        return prisma.venta.update({
            where:{
                id
            },
            data: data
        })
    }

    async delete(id: number): Promise<any> {
        return prisma.venta.delete({
            where:{
                id
            }
        })
    }

    async agregarDetalles(
        ventaId: number,
        detalle: {
            productoId: number;
            cantidad: number;
            precio: number;
            subtotal: number;
        }

    ): Promise<void> {
        await prisma.detalleVenta.create({
            data: {
                ventaId,
                productoId: detalle.productoId,
                cantidad: detalle.cantidad,
                precio: detalle.precio,
                subtotal: detalle.subtotal
            }
        });
    }
    

    async actualizarDetalleCantidad(
        detalleId: number,
        cantidad: number,
        precio: number
    ): Promise<void> {
        await prisma.detalleVenta.update({
            where: { id: detalleId },
            data: {
                cantidad,
                subtotal: cantidad * precio
            }
        });
    }

    async eliminarProducto(ventaId: number, productoId: number) {
    // Buscar el detalle para saber cuántas unidades se agregaron
    const detalle = await prisma.detalleVenta.findFirst({
        where: { ventaId, productoId }
    });

    if (!detalle) {
        throw new Error("El producto no existe en esta venta");
    }

    // Usar transacción para asegurar consistencia
    await prisma.$transaction([
        prisma.detalleVenta.deleteMany({
        where: { ventaId, productoId } // eliminamos el detalle específico
        }),
        prisma.producto.update({
        where: { id: productoId },
        data: {
            stock: {
            increment: detalle.cantidad // devolvemos la cantidad al stock
            }
        }
        })
    ]);
    }


    async recalcularTotal(ventaId: number) {
        const detalles = await prisma.detalleVenta.findMany({
            where: { ventaId }
        });

        const total = detalles.reduce((acc, d) => acc + d.subtotal, 0);

        await prisma.venta.update({
            where: { id: ventaId },
            data: { total }
        });
    }


}
