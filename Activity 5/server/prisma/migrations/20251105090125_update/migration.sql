/*
  Warnings:

  - Added the required column `category` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blog` ADD COLUMN `category` ENUM('commercial', 'design', 'nature', 'people', 'photography', 'tech', 'travel', 'uncategorized') NOT NULL,
    MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `picture` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `picture` VARCHAR(191) NULL;
