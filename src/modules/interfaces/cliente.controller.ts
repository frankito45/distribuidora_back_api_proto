

import { Request, Response } from "express";
import { PrismaClientRepository } from "../infrastruture/prisma-Cliente.repository";
import {  ClienteService } from "../applitacation/client.service";
import { error } from "node:console";


const repository = new PrismaClientRepository();

const service = new ClienteService(repository)

export const getClientes = async(
    req:Request,
    res:Response
) => {
    try{

        const result = await service.getClients()
        return res.json(result)
    }catch(error:any){
        res.status(400).json({
            mesagge: error.mesagge
        })
    }
}

export const filtrar = async(
    req:Request,
    res:Response
) => {
    try{
        const params = String(req.query.query)
        if (!params) {
            throw new Error("filtrar requiere query");
        }
        const cliente = await service.getFilterBarrio(params)
        return   res.json(cliente)
    }catch(error:any){
        res.status(400).json({
            mesagge: error.mesagge
        })
    }
}



export const createCliente = async(
    req:Request,
    res:Response,
) => {
    
    try {
    const result = await service.createClient(req.body)
        res.status(200).json(result)
    }catch (error:any) {
        res.status(400).json({
            message: error.message
        })
    }

}

export const getClienteById = async(
    req:Request,
    res:Response
) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Id inválido'
            });
        }
        const result = await service.getClientById(id)
        return res.json(result);
    } catch (error:any) {
        return res.status(404).json({
            message: error.message
        });
    }
}

export const updateCliente = async(
    req:Request,
    res:Response
) => {
    console.log('sin')
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Id inválido'
            });
        }
        const data = req.body;
        console.log(id,data)
        const result = await service.updateCliente(id, data)
        return res.json(result);
    } catch (error:any) {
        return res.status(404).json({
            message: error.message
        });
    }
}

export const deleteCliente = async(
    req:Request,
    res:Response
) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Id inválido'
            });
        }
        const result = await service.deleteCliente(id)
        return res.json(result);
    } catch (error:any) {
        return res.status(404).json({
            message: error.message
        });
    }
}