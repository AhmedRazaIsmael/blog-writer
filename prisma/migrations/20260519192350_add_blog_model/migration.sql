/*
  Warnings:

  - Added the required column `metaDescription` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaKeywords` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaTitle` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "metaDescription" TEXT NOT NULL,
ADD COLUMN     "metaKeywords" TEXT NOT NULL,
ADD COLUMN     "metaTitle" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
