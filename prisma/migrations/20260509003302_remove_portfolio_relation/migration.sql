/*
  Warnings:

  - You are about to drop the column `profileId` on the `Portfolio` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_profileId_fkey";

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "profileId";
