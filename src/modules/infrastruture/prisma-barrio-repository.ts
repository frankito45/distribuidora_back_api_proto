import { Barrio } from "@prisma/client";
import prisma from "../../db/prisma";
import { BarrioRepository } from "../domain/barrio.repository";

export class PrismaBarrioRepository implements BarrioRepository{

    async getAll(): Promise<Barrio[]> {
        return prisma.barrio.findMany({})
    }

    async getId(id: number): Promise<any> {
        return prisma.barrio.findFirst({
            where: {
                id:id
            }
        })
    }

    async create(data: any): Promise<Barrio> {
        return prisma.barrio.create({data})
    }

    async update(id: number ,data: any): Promise<Barrio> {
        return prisma.barrio.update({
            where: {
                id: id
            },data:{
                data
            }
        })
    }
}