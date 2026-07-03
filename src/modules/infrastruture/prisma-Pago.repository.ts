import { Prisma, MetodoPago, Pago } from "@prisma/client";
import { PagoRepository } from "../domain/pago.repository";

export class PrismaPagoRepository 
implements PagoRepository {
    async create( 
    tx: Prisma.TransactionClient,
    ventaId: number,
    pago: {
        monto: number;
        metodo: MetodoPago;
    }
): Promise<Pago> {

    return await tx.pago.create({
        data: {
            ventaId,
            monto: pago.monto,
            metodo: pago.metodo
        }
    });

}



}