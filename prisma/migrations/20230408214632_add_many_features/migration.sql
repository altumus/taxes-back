/*
  Warnings:

  - You are about to drop the column `userId` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `organizationAddress` on the `organizations` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UsersType" AS ENUM ('ADMIN', 'VIEWER');

-- CreateEnum
CREATE TYPE "ClientsType" AS ENUM ('IP', 'UL', 'SE');

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_userId_fkey";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "userId",
ADD COLUMN     "clientType" "ClientsType" NOT NULL DEFAULT 'IP',
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "organizationAddress",
ADD COLUMN     "organizationJuridicalAddress" TEXT,
ADD COLUMN     "organizationPhysicalAddress" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" "UsersType" NOT NULL DEFAULT 'ADMIN';

-- CreateTable
CREATE TABLE "TaxesType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "bid" INTEGER NOT NULL,

    CONSTRAINT "TaxesType_pkey" PRIMARY KEY ("id")
);


