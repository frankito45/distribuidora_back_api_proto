

import prisma from "../../db/prisma";
import { CategoriaRepository } from "../domain/categoria.repository";


export class PrismaCategoriaRepository
implements CategoriaRepository {
    
    async getAll(): Promise<any> {
        return prisma.categoria.findMany(
            {
                include:{
                    productos:true
                }
            }
        )
    }

    async getId(id: number): Promise<any> {
        return prisma.categoria.findFirst({
            where: {
                id: id
            },
            include:{
                productos:true
            }
        })
    }

    async create(data: any): Promise<any> {
        return prisma.categoria.create({data})
    }

    async update(id: number, data: any): Promise<any> {
        return prisma.categoria.update({
            where: {
                id: id
            },
            data:{
                data
            }
        })
    }

    async delete(id: number): Promise<any> {
        return prisma.categoria.delete({
            where: {
                id: id
            }
        })
    }

}