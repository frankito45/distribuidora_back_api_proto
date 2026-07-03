import prisma from "../../db/prisma";
import { MetodoPago } from "@prisma/client";
import { PagoRepository } from "../domain/pago.repository";
import { VentaRepository } from "../domain/venta.repository";

interface PagoInput {
    monto: number;
    metodo: MetodoPago;
}

export class PagoService {

    constructor(
        private pagoRepository: PagoRepository,
        private ventaRepository: VentaRepository
    ){}

    async crearPago(
        ventaId: number,
        pagos: PagoInput[]
    ){

        const venta = await this.ventaRepository.getId(ventaId);

        if(!venta){
            throw new Error("La venta no existe");
        }

        if(venta.estado !== "PENDIENTE"){
            throw new Error("La venta ya fue procesada");
        }

        if(pagos.length === 0){
            throw new Error("Debe ingresar al menos un pago");
        }

        const totalPagado = pagos.reduce(
            (total,pago)=> total + pago.monto,
            0
        );

        if(Math.abs(totalPagado - venta.total) > 0.01){
            throw new Error("El total de los pagos no coincide con el total de la venta");
        }

        await prisma.$transaction(async (tx) => {

            for (const pago of pagos) {
                await this.pagoRepository.create(
                    tx,
                    ventaId,
                    pago
                );
            }

            await tx.venta.update({
                where: {
                    id: ventaId
                },
                data: {
                    estado: "PAGADA"
                }
            });

        });

        return this.ventaRepository.getId(ventaId);

    }

}