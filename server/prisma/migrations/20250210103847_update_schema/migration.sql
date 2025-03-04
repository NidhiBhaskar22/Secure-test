/*
  Warnings:

  - The primary key for the `QuestionOption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `OptionID` on the `QuestionOption` table. All the data in the column will be lost.
  - You are about to drop the column `QuestionID` on the `QuestionOption` table. All the data in the column will be lost.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `EndTime` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `RejoinAllowed` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `SessionID` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `StartTime` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `TestID` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `UserID` on the `Session` table. All the data in the column will be lost.
  - The primary key for the `Test` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CreatedAt` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedBy` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `Duration` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `TestID` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `TotalMarks` on the `Test` table. All the data in the column will be lost.
  - The primary key for the `TestQuestionRelation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `QuesID` on the `TestQuestionRelation` table. All the data in the column will be lost.
  - You are about to drop the column `TestID` on the `TestQuestionRelation` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ActiveSession` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `FirstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `UserID` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserTest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `TestID` on the `UserTest` table. All the data in the column will be lost.
  - You are about to drop the column `UserID` on the `UserTest` table. All the data in the column will be lost.
  - The primary key for the `Warning` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `SessionID` on the `Warning` table. All the data in the column will be lost.
  - You are about to drop the column `Timestamps` on the `Warning` table. All the data in the column will be lost.
  - You are about to drop the column `WarningID` on the `Warning` table. All the data in the column will be lost.
  - You are about to drop the column `WarningType` on the `Warning` table. All the data in the column will be lost.
  - You are about to drop the `Options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `optionId` to the `QuestionOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `QuestionOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMarks` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `TestQuestionRelation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testId` to the `TestQuestionRelation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testId` to the `UserTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Warning` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Warning` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warningType` to the `Warning` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `QuestionOption` DROP FOREIGN KEY `QuestionOption_OptionID_fkey`;

-- DropForeignKey
ALTER TABLE `QuestionOption` DROP FOREIGN KEY `QuestionOption_QuestionID_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_TestID_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_UserID_fkey`;

-- DropForeignKey
ALTER TABLE `TestQuestionRelation` DROP FOREIGN KEY `TestQuestionRelation_QuesID_fkey`;

-- DropForeignKey
ALTER TABLE `TestQuestionRelation` DROP FOREIGN KEY `TestQuestionRelation_TestID_fkey`;

-- DropForeignKey
ALTER TABLE `UserTest` DROP FOREIGN KEY `UserTest_TestID_fkey`;

-- DropForeignKey
ALTER TABLE `UserTest` DROP FOREIGN KEY `UserTest_UserID_fkey`;

-- DropForeignKey
ALTER TABLE `Warning` DROP FOREIGN KEY `Warning_SessionID_fkey`;

-- DropIndex
DROP INDEX `QuestionOption_QuestionID_fkey` ON `QuestionOption`;

-- DropIndex
DROP INDEX `Session_TestID_fkey` ON `Session`;

-- DropIndex
DROP INDEX `Session_UserID_fkey` ON `Session`;

-- DropIndex
DROP INDEX `TestQuestionRelation_QuesID_fkey` ON `TestQuestionRelation`;

-- DropIndex
DROP INDEX `User_Email_key` ON `User`;

-- DropIndex
DROP INDEX `UserTest_UserID_fkey` ON `UserTest`;

-- DropIndex
DROP INDEX `Warning_SessionID_fkey` ON `Warning`;

-- AlterTable
ALTER TABLE `QuestionOption` DROP PRIMARY KEY,
    DROP COLUMN `OptionID`,
    DROP COLUMN `QuestionID`,
    ADD COLUMN `optionId` INTEGER NOT NULL,
    ADD COLUMN `questionId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`optionId`, `questionId`);

-- AlterTable
ALTER TABLE `Session` DROP PRIMARY KEY,
    DROP COLUMN `EndTime`,
    DROP COLUMN `RejoinAllowed`,
    DROP COLUMN `SessionID`,
    DROP COLUMN `StartTime`,
    DROP COLUMN `Status`,
    DROP COLUMN `TestID`,
    DROP COLUMN `UserID`,
    ADD COLUMN `endTime` DATETIME(3) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `rejoinAllowed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `score` INTEGER NULL,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'TERMINATED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `testId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Test` DROP PRIMARY KEY,
    DROP COLUMN `CreatedAt`,
    DROP COLUMN `CreatedBy`,
    DROP COLUMN `Description`,
    DROP COLUMN `Duration`,
    DROP COLUMN `TestID`,
    DROP COLUMN `Title`,
    DROP COLUMN `TotalMarks`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdBy` INTEGER NOT NULL,
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `duration` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `title` VARCHAR(255) NOT NULL,
    ADD COLUMN `totalMarks` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `TestQuestionRelation` DROP PRIMARY KEY,
    DROP COLUMN `QuesID`,
    DROP COLUMN `TestID`,
    ADD COLUMN `questionId` INTEGER NOT NULL,
    ADD COLUMN `testId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`testId`, `questionId`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `ActiveSession`,
    DROP COLUMN `CreatedAt`,
    DROP COLUMN `Email`,
    DROP COLUMN `FirstName`,
    DROP COLUMN `LastName`,
    DROP COLUMN `Password`,
    DROP COLUMN `Role`,
    DROP COLUMN `UserID`,
    ADD COLUMN `activeSession` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(50) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `lastName` VARCHAR(50) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserTest` DROP PRIMARY KEY,
    DROP COLUMN `TestID`,
    DROP COLUMN `UserID`,
    ADD COLUMN `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `testId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`testId`, `userId`);

-- AlterTable
ALTER TABLE `Warning` DROP PRIMARY KEY,
    DROP COLUMN `SessionID`,
    DROP COLUMN `Timestamps`,
    DROP COLUMN `WarningID`,
    DROP COLUMN `WarningType`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `sessionId` INTEGER NOT NULL,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `warningType` ENUM('TAB_SWITCH', 'COPY_PASTE', 'SCREEN_SHARE', 'SCREEN_RECORD', 'SCREENSHOT', 'RIGHT_CLICK', 'INSPECT_ELEMENT', 'WINDOW_CHANGE') NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Options`;

-- DropTable
DROP TABLE `Questions`;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionText` TEXT NOT NULL,
    `marks` INTEGER NOT NULL,
    `correctOption` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Option` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `optionText` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `QuestionOption_questionId_idx` ON `QuestionOption`(`questionId`);

-- CreateIndex
CREATE INDEX `Session_userId_testId_idx` ON `Session`(`userId`, `testId`);

-- CreateIndex
CREATE INDEX `Session_status_idx` ON `Session`(`status`);

-- CreateIndex
CREATE INDEX `Test_createdBy_idx` ON `Test`(`createdBy`);

-- CreateIndex
CREATE INDEX `Test_isActive_idx` ON `Test`(`isActive`);

-- CreateIndex
CREATE INDEX `TestQuestionRelation_testId_idx` ON `TestQuestionRelation`(`testId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- CreateIndex
CREATE INDEX `UserTest_userId_idx` ON `UserTest`(`userId`);

-- CreateIndex
CREATE INDEX `Warning_sessionId_idx` ON `Warning`(`sessionId`);

-- CreateIndex
CREATE INDEX `Warning_warningType_idx` ON `Warning`(`warningType`);

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Warning` ADD CONSTRAINT `Warning_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionOption` ADD CONSTRAINT `QuestionOption_optionId_fkey` FOREIGN KEY (`optionId`) REFERENCES `Option`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionOption` ADD CONSTRAINT `QuestionOption_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestQuestionRelation` ADD CONSTRAINT `TestQuestionRelation_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestQuestionRelation` ADD CONSTRAINT `TestQuestionRelation_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTest` ADD CONSTRAINT `UserTest_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTest` ADD CONSTRAINT `UserTest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
