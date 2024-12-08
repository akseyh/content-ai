-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
