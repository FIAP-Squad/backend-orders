/*
  Warnings:

  - You are about to alter the column `cpf` on the `account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `cpf` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `price` INTEGER NOT NULL;
