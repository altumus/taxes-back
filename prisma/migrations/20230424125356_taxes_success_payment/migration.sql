-- CreateTable
CREATE TABLE "TaxesSuccessPayment" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentSum" TEXT NOT NULL,

    CONSTRAINT "TaxesSuccessPayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaxesSuccessPayment" ADD CONSTRAINT "TaxesSuccessPayment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
