/*
  Warnings:

  - You are about to drop the column `usersId` on the `folders` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Folders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `folders` DROP FOREIGN KEY `Folders_usersId_fkey`;

-- DropIndex
DROP INDEX `Folders_usersId_fkey` ON `folders`;

-- AlterTable
ALTER TABLE `folders` DROP COLUMN `usersId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Folders` ADD CONSTRAINT `Folders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
