/*
  Warnings:

  - Changed the type of `content` on the `Posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL;
