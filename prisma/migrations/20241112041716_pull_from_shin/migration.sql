/*
  Warnings:

  - You are about to drop the column `created_at` on the `mission` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `mission` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `mission` table. All the data in the column will be lost.
  - You are about to drop the column `reward` on the `mission` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `mission` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `mission` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `region` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `region` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `store` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `store` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(30)`.
  - You are about to drop the `_storemissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `food_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_favor_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_mission` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `region` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `money` to the `mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `star` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_storemissions` DROP FOREIGN KEY `_StoreMissions_A_fkey`;

-- DropForeignKey
ALTER TABLE `_storemissions` DROP FOREIGN KEY `_StoreMissions_B_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user_favor_category` DROP FOREIGN KEY `user_favor_category_food_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_favor_category` DROP FOREIGN KEY `user_favor_category_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission` DROP FOREIGN KEY `user_mission_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission` DROP FOREIGN KEY `user_mission_user_id_fkey`;

-- AlterTable
ALTER TABLE `mission` DROP COLUMN `created_at`,
    DROP COLUMN `deadline`,
    DROP COLUMN `description`,
    DROP COLUMN `reward`,
    DROP COLUMN `title`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `money` INTEGER NOT NULL,
    ADD COLUMN `score` INTEGER NOT NULL,
    ADD COLUMN `store_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `region` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `created_at`,
    DROP COLUMN `score`,
    DROP COLUMN `storeId`,
    DROP COLUMN `userId`,
    ADD COLUMN `member_id` INTEGER NOT NULL,
    ADD COLUMN `star` FLOAT NOT NULL,
    ADD COLUMN `store_id` INTEGER NOT NULL,
    MODIFY `content` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `store` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    MODIFY `name` VARCHAR(30) NOT NULL,
    MODIFY `address` VARCHAR(100) NOT NULL,
    MODIFY `score` FLOAT NOT NULL DEFAULT 0.0;

-- DropTable
DROP TABLE `_storemissions`;

-- DropTable
DROP TABLE `food_category`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `user_favor_category`;

-- DropTable
DROP TABLE `user_mission`;

-- CreateTable
CREATE TABLE `member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(15) NOT NULL,
    `gender` VARCHAR(15) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_food` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `food_id` INTEGER NOT NULL,

    INDEX `food_id`(`food_id`),
    INDEX `member_id`(`member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(255) NOT NULL DEFAULT 'CHALLENGING',
    `member_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,

    INDEX `member_id`(`member_id`),
    INDEX `mission_id`(`mission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `store_id` ON `mission`(`store_id`);

-- CreateIndex
CREATE UNIQUE INDEX `region_name_key` ON `region`(`name`);

-- CreateIndex
CREATE INDEX `member_id` ON `review`(`member_id`);

-- CreateIndex
CREATE INDEX `store_id` ON `review`(`store_id`);

-- AddForeignKey
ALTER TABLE `member_food` ADD CONSTRAINT `member_food_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_food` ADD CONSTRAINT `member_food_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `store` RENAME INDEX `store_region_id_fkey` TO `region_id`;
