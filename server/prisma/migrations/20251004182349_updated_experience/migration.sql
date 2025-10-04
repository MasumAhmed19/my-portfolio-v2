/*
  Warnings:

  - You are about to drop the column `slug` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `EndDate` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Experience_slug_key";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "slug",
DROP COLUMN "title",
DROP COLUMN "views",
ADD COLUMN     "EndDate" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL;
