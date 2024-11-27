-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Content" ("author", "id", "subject", "text") SELECT "author", "id", "subject", "text" FROM "Content";
DROP TABLE "Content";
ALTER TABLE "new_Content" RENAME TO "Content";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
