/*
  Warnings:

  - The primary key for the `ContentCalendar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ContentCalendar` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `UserProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ContentCalendar" DROP CONSTRAINT "ContentCalendar_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "category" DROP NOT NULL,
ADD CONSTRAINT "ContentCalendar_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id");
