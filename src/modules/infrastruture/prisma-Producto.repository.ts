

import prisma from "../../db/prisma";
import { ProductoRepository } from "../domain/producto.repositoy";

export class PrismaProductoRepository 
implements ProductoRepository {

    async getAll(){
        return prisma.producto.findMany(
            {
                include:{
                    categoria:true,
                    proveedor:true
                }
            }
        );
    }

    async getId(id: number): Promise<any> {
        return prisma.producto.findUnique({
            where: {
                id : id
            },
            include:{
                categoria:true,
                proveedor:true
            }
        })
    }

    async create(data: any): Promise<any> {
        return prisma.producto.create({data})
    }

    async update(id:number,data:any): Promise<any> {

        return prisma.producto.update({
            where:{
                id: id
            },
            data: data
        })
        
    }

    async delete(id:number): Promise<any> {
        return prisma.producto.delete({
            where:{
                id: id
            }
        })
    }

    async increment(id: number, catntidad: number): Promise<any> {
        return prisma.producto.update({
            where:{
                id: id
            },
            data:{
                stock: {
                    increment: catntidad
                }
            }
        })
    }

    async decrement(id: number, catntidad: number): Promise<any> {
        return prisma.producto.update({
            where:{id},
            data:{
                stock:{
                    decrement:catntidad
                }
            }
        })
    }

            // GET /api/productos?query=texto
    async buscarProductos(query: string) {
    return prisma.producto.findMany({
        where: {
        nombre: {
            startsWith: query,
            mode: 'insensitive'
        }
        },
        take: 20
    });
    }

}


