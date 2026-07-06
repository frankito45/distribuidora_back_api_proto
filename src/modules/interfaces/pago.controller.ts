import { PagoService } from "../applitacation/pago.service";
import { PrismaPagoRepository } from "../infrastruture/prisma-Pago.repository";
import { Request,Response } from "express";
import { PrismaVentaRepository } from "../infrastruture/prisma-Venta.repository";

const repositoryPago = new PrismaPagoRepository()
const repositoryVenta = new PrismaVentaRepository()
const service = new PagoService(repositoryPago,repositoryVenta)

export const pagar = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            throw new Error("venta no puede ser nula");
        }

        const pagos = req.body;
        console.log(req.body);
        if (!pagos) {
            throw new Error("Los pagos no pueden ser nulos");
        }

        const result = await service.crearPago(id, pagos);

        return res.json(result);

    } catch (error: any) {
        return res.status(400).json({
            message: error.message
        });
    }
};
