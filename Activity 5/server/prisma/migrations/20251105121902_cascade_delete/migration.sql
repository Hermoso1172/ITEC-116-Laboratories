-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_blogId_fkey`;

-- DropIndex
DROP INDEX `Comment_blogId_fkey` ON `comment`;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
