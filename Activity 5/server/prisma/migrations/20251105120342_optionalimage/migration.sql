-- AlterTable
ALTER TABLE `blog` MODIFY `picture` VARCHAR(191) NULL DEFAULT 'image.jpg',
    MODIFY `category` ENUM('commercial', 'design', 'nature', 'people', 'photography', 'tech', 'travel', 'uncategorized') NOT NULL DEFAULT 'uncategorized';

-- AlterTable
ALTER TABLE `user` MODIFY `picture` VARCHAR(191) NULL DEFAULT 'image.jpg';
