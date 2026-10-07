/*
  Warnings:

  - You are about to drop the column `userFrom` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firebaseUid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firebaseUid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'MICROSOFT', 'APPLE', 'EMAIL');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userFrom",
ADD COLUMN     "authProvider" "AuthProvider" NOT NULL DEFAULT 'EMAIL',
ADD COLUMN     "firebaseUid" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "User"("firebaseUid");
