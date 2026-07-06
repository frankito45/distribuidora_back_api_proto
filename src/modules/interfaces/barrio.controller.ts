import {  Request, Response } from "express";
import { PrismaBarrioRepository } from "../infrastruture/prisma-barrio-repository";
import { BarrioService } from "../applitacation/barrio.service";


const repository = new PrismaBarrioRepository()
const service = new BarrioService(repository)

export const getAllBarrio = async(
    req:Request,
    res:Response
)=> {
    try{
        const result = await service.getAll()
        return res.json(result)
    }catch(error:any){
        return res.status(400).json({message: error.mesagge})

    }
}


export const getBarrioById = async(
    req:Request,
    res:Response
) => {
    try{
        const id = Number(req.params.id)
        const result = await service.getId(id)
        return res.json(result)
    }catch(error:any){
        return res.status(400).json({message : error.mesagge})
    }
}

export const createBarrio = async(
    req:Request,
    res:Response
) => {
    try {

        const data = req.body
        if (!data.nombre) {
            throw new Error("nombre no puede estar bacio");
        }
        const result = await service.create(data)
        return res.json(result)
        
    } catch (error:any) {
        return res.status(400).json({message : error.message})
    }
}

export const updateBarrio = async(
    req:Request,
    res:Response
) => {
    try {
        const id = Number(req.params.id)
        const data = req.body

        if (isNaN(id)) {
            throw new Error("id no puede ser nulo");
        }

        const result = await service.update(id,data)
        return res.json(result)
        
    } catch (error:any) {
        res.status(400).json({ message: error.message})
    }
}