/*
  Warnings:

  - Added the required column `amount` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;
