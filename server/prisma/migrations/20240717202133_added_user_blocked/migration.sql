-- CreateTable
CREATE TABLE `UserBlocked` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserBlocked_id_key`(`id`),
    UNIQUE INDEX `UserBlocked_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
