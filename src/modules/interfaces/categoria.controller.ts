import { Request, Response } from "express";
import { PrismaCategoriaRepository } from "../infrastruture/prisma-Categoria.repository";
import { CategoriaServices } from "../applitacation/categoria.service";


const repository = new PrismaCategoriaRepository()
const service = new CategoriaServices(repository)

export const getCategoria = async(
    req:Request,
    res:Response
) => {
    try{

        const result = await service.getCategoria()
        return res.json(result)
    }catch(error:any){
         res.status(400).json({
            message: error.message
        })
    }
}
export const getCategoriaId = async(
    req:Request,
    res:Response    
) => {
    try {
        const id = Number(req.params.id)

        if(isNaN(id)) {
            return res.status(400).json({
                message: 'Id Invalido'
            })
        }
        
        const result = await service.getCategoriaId(id)
        res.status(200).json(result)

    } catch (error:any) {
        
        res.status(400).json({
            message: error.message
        })
    }
}

export const crearCategoria = async(
    req:Request,
    res:Response
) =>{

    try {
        const data = req.body
        if (!data.nombre) {
            throw new Error("categoria nombre no pudede ser vacia");
            
        }
        const result = await service.createCategoria(data)
        return res.status(200).json(result)

    } catch (error:any) {
        return res.status(400).json({
            message: error.message
        })
    }

}

export const updataCategoria = async(
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({
                message: 'Id no encontrado'
            })
        }
        const data = req.body;
        const result = await service.updateCategoria(id, data)
        return res.json(result)
    } catch (error:any) {
        return res.status(400).json({
            message: error.message
        })
        
    }
}

export const deleteCategoria = async(
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id)
    try{
        if (isNaN(id)) {
            res.status(400).json({
                message: 'Categoria Invalida'
            })
        }
        const result = await service.deleteCategoria(id)
        return res.json(result)
    }catch (error:any){
        return res.status(400).json({
            message: error.message
        })
    }
}