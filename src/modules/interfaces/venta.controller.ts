import { Request,Response } from "express";
import { PrismaVentaRepository } from "../infrastruture/prisma-Venta.repository";
import { VentaService } from "../applitacation/venta.service";
import { PrismaProductoRepository } from "../infrastruture/prisma-Producto.repository";
import { PrismaClientRepository } from "../infrastruture/prisma-Cliente.repository";
import { resourceUsage } from "node:process";

const repository = new  PrismaVentaRepository()
const productoRepository = new PrismaProductoRepository()
const clienteRepository = new PrismaClientRepository()
const service = new VentaService(repository,productoRepository,clienteRepository)

export const getVentas = async(
    req:Request,
    res:Response
) => {
    try{
        const skip = parseInt(req.query.skip as string) || 0;
        const take = parseInt(req.query.take as string) || 10;

        const params = {skip:skip,take:take}

        const result =
            await service.getVentas(params);

        return res.json(result);

    }catch(error:any){

        return res.status(500).json({
            message:error.message
        });

    }
}

export const getDay = async(
    req:Request,
    res: Response
) => {
  try {
    const { day } = req.query; // se espera ?day=2026-06-28

    if (!day) {
      return res.status(400).json({ message: "La fecha no puede ser vacía" });
    }

    // convertir string a Date
    const fecha = new Date(day as string);

    const ventas = await service.filterFecha(fecha);

    return res.json({ ventas });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export const getFilterPendiente = async(
    req:Request,
    res:Response
) => {
    try{
        const result = await service.getVentasPendientes()
        return res.json(result)
    }catch(error:any){
        return res.status(500).json({
            message: error.message
        })
    }
}

export const countPendiente = async(
    req:Request,
    res:Response
) => {
    try{
        const result = await service.getcountEstado();

        return res.json({result});

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
    try {
        const data = req.body
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
        const estado = req.body.estado
        const metodoPago = req.body.metodoPago
        const result = await service.cambiarEstado(id,estado,metodoPago)
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

export const desAgregarProducto = async (req: Request, res: Response) => {
  try {
    const ventaId = Number(req.params.ventaId);
    const productoId = Number(req.params.productoId);

    if (isNaN(ventaId)) throw new Error("VentaId no puede ser nulo");
    if (isNaN(productoId)) throw new Error("ProductoId no puede ser nulo");

    const result = await service.desAgregarProducto(ventaId, productoId);
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};





export const descuento = async (
    req:Request,
    res:Response
) => {
    try {
    const ventaId = Number(req.params.id)
    console.log(req.body)
    const oferta  = req.body
    console.log(oferta)

    if (isNaN(ventaId)) {
        throw new Error("no se a encontrado la venta");
    }

    if (!oferta) {
        throw new Error("oferta no puede estar vacio")
    }

    const result = await service.agregarOferta(ventaId,oferta)
    
    return res.json(result)
}
catch (error:any){
    return res.status(400).json({
        message: error.message
    })
}
}


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

export const informe = async(
    req:Request,
    res:Response
) =>  {
    try {
        console.log(req.params)
        const day = req.params.fecha as string
        console.log(day)
        if (!day) {
            throw new Error("dia no puede ser nulo");
        }
        const result = await service.informexDia(day)

        return res.json(result)
        
    } catch (error:any) {
        if (error) {
            return res.status(400).json({messge: error.message})
        }
    }
}  