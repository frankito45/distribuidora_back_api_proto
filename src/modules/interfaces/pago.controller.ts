import { PagoService } from "../applitacation/pago.service";
import { PrismaPagoRepository } from "../infrastruture/prisma-Pago.repository";
import { Request,Response } from "express";
import { PrismaVentaRepository } from "../infrastruture/prisma-Venta.repository";

const repositoryPago = new PrismaPagoRepository()
const repositoryVenta = new PrismaVentaRepository()
const service = new PagoService(repositoryPago,repositoryVenta)

export const pagar = async (
    req:Request,
    res:Response
) => {
    try{

        const id = Number(req.params.id)
        if (isNaN(id)) {
             throw new Error("venta no puede ser nula");   
        }

        const pago = req.body.pago

        if (!pago) {
             throw new Error("pago no puede ser nulo");
        }
        const result = await service.crearPago(id,pago)
        return res.json(result)


    }catch(error:any){
        if (error) {
            return res.status(400).json({message:error.message})
        }
    }
}