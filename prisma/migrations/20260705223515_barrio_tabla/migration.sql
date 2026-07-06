/*
  Warnings:

  - You are about to drop the column `barrio` on the `Cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "barrio",
ADD COLUMN     "barrioId" INTEGER;

-- CreateTable
CREATE TABLE "Barrio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Barrio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Barrio_nombre_key" ON "Barrio"("nombre");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_barrioId_fkey" FOREIGN KEY ("barrioId") REFERENCES "Barrio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
