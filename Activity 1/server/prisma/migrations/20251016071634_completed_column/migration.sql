/*
  Warnings:

  - Made the column `due_date` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `completed` BOOLEAN NULL,
    MODIFY `due_date` DATETIME(3) NOT NULL;
