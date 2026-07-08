/*
  Warnings:

  - Made the column `oferta` on table `Venta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Venta" ALTER COLUMN "oferta" SET NOT NULL;
