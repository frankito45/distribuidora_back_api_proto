import { Venta } from "@prisma/client";
import prisma from "../../db/prisma";
import { VentaRepository } from "../domain/venta.repository";

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
