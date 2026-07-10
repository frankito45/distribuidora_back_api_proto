// shared/types/venta.types.ts

import { Barrio, Prisma } from "@prisma/client";

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
export type VentaId = Prisma.VentaGetPayload<{
    include: {
        cliente: {
            include:{
               barrio:true 
            }
        };
        pagos: true;
        detalles: {
            include: {
                producto: true;
            };
        };
    };
}>;
