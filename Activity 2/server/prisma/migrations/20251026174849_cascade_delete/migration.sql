-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `Notes_folderId_fkey`;

-- DropIndex
DROP INDEX `Notes_folderId_fkey` ON `notes`;

-- AddForeignKey
ALTER TABLE `Notes` ADD CONSTRAINT `Notes_folderId_fkey` FOREIGN KEY (`folderId`) REFERENCES `Folders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
