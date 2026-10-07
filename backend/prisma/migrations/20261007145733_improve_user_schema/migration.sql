/*
  Warnings:

  - You are about to drop the column `tittle` on the `ServiceOffering` table. All the data in the column will be lost.
  - Added the required column `title` to the `ServiceOffering` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceOffering" DROP COLUMN "tittle",
ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
