/*
  Warnings:

  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isMarried` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "isMarried" BOOLEAN NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL;
