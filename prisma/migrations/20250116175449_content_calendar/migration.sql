/*
  Warnings:

  - You are about to drop the `ContentExample` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ContentExample";

-- DropEnum
DROP TYPE "ContentLength";

-- DropEnum
DROP TYPE "EmojiUsage";

-- CreateTable
CREATE TABLE "ContentCalendar" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dateTo" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentCalendar_pkey" PRIMARY KEY ("id")
);
