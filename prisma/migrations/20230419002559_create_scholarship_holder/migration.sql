-- CreateTable
CREATE TABLE "ScholarshipHolder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paymentsNumber" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScholarshipHolder_pkey" PRIMARY KEY ("id")
);
