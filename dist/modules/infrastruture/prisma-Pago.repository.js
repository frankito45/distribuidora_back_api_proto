"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPagoRepository = void 0;
class PrismaPagoRepository {
    async create(tx, ventaId, pago) {
        return await tx.pago.create({
            data: {
                ventaId,
                monto: pago.monto,
                metodo: pago.metodo
            }
        });
    }
}
exports.PrismaPagoRepository = PrismaPagoRepository;
