/*
  Warnings:

  - Added the required column `mustPay` to the `TaxesPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaxesPayment" ADD COLUMN     "mustPay" TEXT NOT NULL;
