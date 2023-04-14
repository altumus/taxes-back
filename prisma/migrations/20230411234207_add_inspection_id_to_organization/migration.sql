/*
  Warnings:

  - Added the required column `inspectionId` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "inspectionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspections"("id") ON DELETE CASCADE ON UPDATE CASCADE;



