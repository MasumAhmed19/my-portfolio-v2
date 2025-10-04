-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "images" TEXT[],

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);
