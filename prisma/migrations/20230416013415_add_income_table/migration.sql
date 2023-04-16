/*
  Warnings:

  - You are about to drop the column `income` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "income";

-- CreateTable
CREATE TABLE "TaxesPayment" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextPaymentDate" TEXT NOT NULL,

    CONSTRAINT "TaxesPayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaxesPayment" ADD CONSTRAINT "TaxesPayment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxesPayment" ADD CONSTRAINT "TaxesPayment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
