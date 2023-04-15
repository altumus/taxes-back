/*
  Warnings:

  - Added the required column `taxesTypeId` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "income" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "taxesTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_taxesTypeId_fkey" FOREIGN KEY ("taxesTypeId") REFERENCES "TaxesType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
