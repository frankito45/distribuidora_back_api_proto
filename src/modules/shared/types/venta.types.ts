// shared/types/venta.types.ts

import { Prisma } from "@prisma/client";

export type VentaInforme = Prisma.VentaGetPayload<{
    include: {
        cliente: true;
        pagos: true;
        detalles: {
            include: {
                producto: true;
            };
        };
    };
}>;