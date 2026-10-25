/*
  Warnings:

  - You are about to drop the column `iconUrl` on the `ServiceCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ServiceCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `icon` to the `ServiceCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceCategory" DROP COLUMN "iconUrl",
ADD COLUMN     "icon" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_name_key" ON "ServiceCategory"("name");
