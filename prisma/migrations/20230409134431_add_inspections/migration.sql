/*
  Warnings:

  - Added the required column `inspectionId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "inspectionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Inspections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "Inspections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
