import { MetodoPago, Pago, Prisma } from "@prisma/client";

export interface PagoRepository {

    // getAll(): Promise<Pago[]>;

    // getById(id: number): Promise<Pago | null>;

    create(
        tx: Prisma.TransactionClient,
        ventaId: number,
        pago: {
            monto: number;
            metodo: MetodoPago;
        }
    ): Promise<Pago>;

    // update(
    //     id: number,
    //     data: any
    // ): Promise<Pago>;

    // delete(
    //     id: number
    // ): Promise<Pago>;
}