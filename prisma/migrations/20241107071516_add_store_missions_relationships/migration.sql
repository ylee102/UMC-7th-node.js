-- CreateTable
CREATE TABLE `_StoreMissions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_StoreMissions_AB_unique`(`A`, `B`),
    INDEX `_StoreMissions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_StoreMissions` ADD CONSTRAINT `_StoreMissions_A_fkey` FOREIGN KEY (`A`) REFERENCES `mission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StoreMissions` ADD CONSTRAINT `_StoreMissions_B_fkey` FOREIGN KEY (`B`) REFERENCES `store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
