/*
  Warnings:

  - The values [FF4848,E69819,F3EC1B,26E933,2D41C5,2DC1E3,DE27C6] on the enum `Folders_color` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `folders` MODIFY `color` ENUM('RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'CYAN', 'PINK') NOT NULL;
