-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_category_id_fkey`;

-- DropIndex
DROP INDEX `tasks_category_id_fkey` ON `tasks`;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
