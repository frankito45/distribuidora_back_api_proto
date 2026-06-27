import { Request, Response } from "express";
import { ProductoService } from "../applitacation/producto.service"
import { PrismaProductoRepository } from "../infrastruture/prisma-Producto.repository"
import { Extensions } from "@prisma/client/runtime/client";

const repository = new PrismaProductoRepository()

const service = new ProductoService(repository)


export const getProductos = async (
    req:Request,
    res:Response
) => {
    try{

        const result = await service.getProductos()
        return res.json(result)
    }catch(error:any){
         res.status(400).json({
            mesagge: error.mesagge
        })
    }
}

export const getProductoById = async(
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

        const result =
            await service.getProductoById(id);

        return res.json(result);

    } catch (error: any) {

        return res.status(404).json({
            message: error.message
        });

    }
}

export const createProducto = async(
    req:Request,
    res:Response
) => {
    try {
        const data = req.body
        const result = await service.crearProducto(data)
        return res.status(201).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
            error
        })
    }
}

export const increment = async(
    req:Request,
    res:Response
) => {
    try {
        const id = Number(req.params.id)
        const data = req.body.increment;
        console.log('consolaa',req.body.increment)
        if (isNaN(id)) {
            throw new Error("id no puede ser nulo");
        }
        


        const result = await service.incrementeStock(id,data)
        return res.json(result)

    } catch (error:any) {
        return res.status(400).json({
            mesagge: error.message
        })
    }
}

export const updateProducto = async(
    req:Request,
    res:Response
) => {
    try {
        console.log('resp')
        const id = Number(req.params.id);
        const data = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Id inválido'
            });
        }

        const result = await service.updateProducto(id, data);
        return res.json(result);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const deleteProducto = async(
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

        const result = await service.deleteProducto(id);
        return res.json(result);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const buscarProducto = async (req:Request, res:Response) => {

  const query = String(req.query.query);

  if (!query) {
    return res.status(400).json({
      message: 'query es obligatorio'
    });
  }

  const productos =
    await service.buscarProductos(query);

  res.json(productos);
};