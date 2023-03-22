/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Article";

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inn" TEXT,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "organizationInn" TEXT NOT NULL,
    "organizationKpp" TEXT NOT NULL,
    "organizationOgrn" TEXT NOT NULL,
    "organizationAddress" TEXT NOT NULL,
    "ownerPosition" TEXT NOT NULL,
    "clientId" INTEGER,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_organizationInn_key" ON "Organization"("organizationInn");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_organizationOgrn_key" ON "Organization"("organizationOgrn");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
