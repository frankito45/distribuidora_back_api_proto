

import prisma from "../../db/prisma";
import { ClienteRepository } from "../domain/cliente.repository";

export class PrismaClientRepository 
implements ClienteRepository {

    async getAll(){
        return prisma.cliente.findMany({
            include: {
                 barrio:true
            }
        });
    }
    
async getFilterBarrio(barrioId: number) {
  return prisma.cliente.findMany({
    where: {
      barrioId: barrioId
    },
    include: {
      barrio: true
    }
  });
}

    async getId(id: number): Promise<any> {
        return prisma.cliente.findUnique({
            where: {
                id: id
            },
            include:{
                barrio:true
            }
        })
    }

    async create(data: any): Promise<any> {
        return prisma.cliente.create({data})
    }


    async update(id: number,data:any): Promise<any> {
        return prisma.cliente.update({
            where: {
                id: id
            },
            data: data 
            
        })
    }

    async delete(id: number): Promise<any> {
        return prisma.cliente.delete({
            where:{
                id
            }
        })   
    }


}


