import { Request,Response } from "express";
import { PrismaVentaRepository } from "../infrastruture/prisma-Venta.repository";
import { VentaService } from "../applitacation/venta.service";
import { PrismaProductoRepository } from "../infrastruture/prisma-Producto.repository";
import { PrismaClientRepository } from "../infrastruture/prisma-Cliente.repository";

const repository = new  PrismaVentaRepository()
const productoRepository = new PrismaProductoRepository()
const clienteRepository = new PrismaClientRepository()
const service = new VentaService(repository,productoRepository,clienteRepository)

export const getVentas = async(
    req:Request,
    res:Response
) => {
    try{
        const result =
            await service.getVentas();

        return res.json(result);

    }catch(error:any){

        return res.status(500).json({
            message:error.message
        });

    }
}

export const getVentaById = async(
    req:Request,
    res:Response
) => {
    try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({
            message: 'id no valido'
        })
    }

    const result = await service.getVentaId(id)
    return res.json(result)

    } catch (error:any) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const createVenta = async(
    req:Request,
    res:Response
) => {
    const data = req.body
    try {
        const result = await service.createVenta(data)
        return res.status(201).json(result)
    } catch (error:any) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const cambiarEstado = async(
    req:Request,
    res:Response
) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            throw new Error('id invalido')
        }
        const data = req.body
        const result = await service.cambiarEstado(id,data)
        return res.json(result)

    }catch(error:any){
        return res.status(400).json({
            message:error.message
        })
    }
}

export const agregarProductos = async (
    req: Request,
    res: Response
) => {
    try {

        const ventaId = Number(req.params.id);

        if (isNaN(ventaId)) {
            return res.status(400).json({
                message: "Id inválido"
            });
        }
                console.log('dentro de venta',req.body)

        const result =
            await service.agregarProducto(
                ventaId,
                req.body
            );

        return res.json(result);

    } catch (error: any) {
        return res.status(400).json({
            message: error.message
        });
    }
};


// export const deleteVenta = async(
//     req:Request,
//     res:Response
// ) => {
//     try{
//         const id = Number(req.params.id)
//         if (isNaN(id)) {
//             throw new Error("id invalido");
            
//         }
//         const result = await service.deleteVenta(id)
//         return res.json(result)
//     }catch(error:any){
//         return res.status(400).json({
//             message: error.message
//         })
//     }
// }