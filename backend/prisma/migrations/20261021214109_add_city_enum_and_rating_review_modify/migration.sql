/*
  Warnings:

  - Added the required column `city` to the `ServiceProvider` table without a default value. This is not possible if the table is not empty.
  - Made the column `reviewCount` on table `ServiceProvider` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "City" AS ENUM ('ABU_DHABI', 'DUBAI', 'SHARJAH', 'AJMAN', 'UMM_AL_QUWAIN', 'RAS_AL_KHAIMAH', 'FUJAIRAH');

-- DropForeignKey
ALTER TABLE "ServiceProvider" DROP CONSTRAINT "ServiceProvider_userId_fkey";

-- AlterTable
ALTER TABLE "ServiceProvider" ADD COLUMN     "city" "City" NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "reviewCount" SET NOT NULL,
ALTER COLUMN "reviewCount" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "ServiceProvider" ADD CONSTRAINT "ServiceProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
