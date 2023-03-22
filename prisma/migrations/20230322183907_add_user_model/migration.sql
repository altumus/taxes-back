/*
  Warnings:

  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_clientId_fkey";

-- DropTable
DROP TABLE "Organization";

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "organizationInn" TEXT NOT NULL,
    "organizationKpp" TEXT NOT NULL,
    "organizationOgrn" TEXT NOT NULL,
    "organizationAddress" TEXT NOT NULL,
    "ownerPosition" TEXT NOT NULL,
    "clientId" INTEGER,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_organizationInn_key" ON "organizations"("organizationInn");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_organizationOgrn_key" ON "organizations"("organizationOgrn");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
