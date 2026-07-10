import { EstadoVenta, Prisma, Venta } from "@prisma/client";
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
            orderBy: { id: "desc" }
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
                cliente: {
                    include:{
                        barrio:true
                    }
                },
                detalles: {
                    include: {
                        producto: true
                    }
                },
                pagos:true
            
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

    async agregarProducto(
        ventaId: number,
        detalle: {
            producto: number;
            cantidad: number;
        }
    ) {

        return prisma.$transaction(async (tx) => {

            const venta = await tx.venta.findUnique({
                where: { id: ventaId },
                include: {
                    detalles: true
                }
            });

            if (!venta) {
                throw new Error("Venta no encontrada");
            }

            const producto = await tx.producto.findUnique({
                where: {
                    id: detalle.producto
                }
            });

            if (!producto) {
                throw new Error("Producto no encontrado");
            }

            if (producto.stock < detalle.cantidad) {
                throw new Error(`Stock insuficiente. Disponible: ${producto.stock}`);
            }

            const detalleExistente = venta.detalles.find(
                d => d.productoId === producto.id
            );

            if (detalleExistente) {

                const nuevaCantidad =
                    detalleExistente.cantidad + detalle.cantidad;

                await tx.detalleVenta.update({
                    where: {
                        id: detalleExistente.id
                    },
                    data: {
                        cantidad: nuevaCantidad,
                        subtotal: nuevaCantidad * producto.precioVenta
                    }
                });

            } else {

                await tx.detalleVenta.create({
                    data: {
                        ventaId,
                        productoId: producto.id,
                        cantidad: detalle.cantidad,
                        precio: producto.precioVenta,
                        subtotal: producto.precioVenta * detalle.cantidad
                    }
                });

            }

            await tx.producto.update({
                where: {
                    id: producto.id
                },
                data: {
                    stock: {
                        decrement: detalle.cantidad
                    }
                }
            });

            await this.recalcularTotal(tx, ventaId);

            return tx.venta.findUnique({
                where: {
                    id: ventaId
                },
                include: {
                    cliente: true,
                    detalles: {
                        include: {
                            producto: true
                        }
                    },
                    pagos: true
                }
            });

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


    // eliminar producto de detalles

    async eliminarProducto(ventaId: number, productoId: number) {

        return prisma.$transaction(async (tx) => {

            // Buscar el detalle para saber cuántas unidades devolver al stock
            const detalle = await tx.detalleVenta.findFirst({
                where: {
                    ventaId,
                    productoId
                }
            });

            if (!detalle) {
                throw new Error("El producto no existe en esta venta");
            }


            // Eliminar detalle de la venta
            await tx.detalleVenta.deleteMany({
                where: {
                    ventaId,
                    productoId
                }
            });


            // Devolver stock al producto
            await tx.producto.update({
                where: {
                    id: productoId
                },
                data: {
                    stock: {
                        increment: detalle.cantidad
                    }
                }
            });


            // Recalcular total teniendo en cuenta ofertas
            await this.recalcularTotal(tx, ventaId);


            // Devolver venta actualizada
            return tx.venta.findUnique({
                where: {
                    id: ventaId
                },
                include: {
                    cliente: true,
                    detalles: {
                        include: {
                            producto: true
                        }
                    },
                    pagos: true
                }
            });

        });

    }



    async recalcularTotal(
        db: Prisma.TransactionClient | typeof prisma,
        ventaId: number
    ) {

        const detalles = await db.detalleVenta.findMany({
            where: { ventaId }
        });

        const venta = await db.venta.findUnique({
            where: { id: ventaId }
        });

        if (!venta) {
            throw new Error("Venta no encontrada");
        }

        const subtotal = detalles.reduce((acc, d) => acc + d.subtotal, 0);

        const total = subtotal - (venta.oferta ?? 0);

        await db.venta.update({
            where: { id: ventaId },
            data: { total }
        });
    }

    async crearOferta(ventaId:number,oferta:number){
        return prisma.$transaction(async (tx)=>{
            await tx.venta.update({
                where: {
                    id: ventaId
                },
                data: {
                    oferta: oferta
                }
            })
            await this.recalcularTotal(tx, ventaId);

            return tx.venta.findUnique({
                where: {
                    id:ventaId
                }
            })
        })

    }

    async informe(inicio:Date, fin:Date): Promise<any> {
        return await prisma.venta.findMany({
    where: {
        fecha: {
            gte: inicio,
            lt: fin
        },
        estado: "PAGADA"
    },
    include: {
        detalles: {
            include: {
                producto: true
            }
        },
        pagos: true,
        cliente: true
    }
});
        
    }
    

}

