-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('EFECTIVO', 'TRANSFERENCIA', 'TARJETA');

-- AlterTable
ALTER TABLE "Venta" ADD COLUMN     "metodoPago" "MetodoPago" NOT NULL DEFAULT 'EFECTIVO';
