/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `authorId` on the `Content` table. All the data in the column will be lost.
  - Added the required column `author` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL
);
INSERT INTO "new_Content" ("id", "subject", "text") SELECT "id", "subject", "text" FROM "Content";
DROP TABLE "Content";
ALTER TABLE "new_Content" RENAME TO "Content";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
