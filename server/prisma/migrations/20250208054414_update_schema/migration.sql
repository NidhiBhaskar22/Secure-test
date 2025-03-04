/*
  Warnings:

  - The primary key for the `QuestionOption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is_correct` on the `QuestionOption` table. All the data in the column will be lost.
  - You are about to drop the column `option_id` on the `QuestionOption` table. All the data in the column will be lost.
  - You are about to drop the column `option_text` on the `QuestionOption` table. All the data in the column will be lost.
  - You are about to drop the column `question_id` on the `QuestionOption` table. All the data in the column will be lost.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `end_time` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `rejoin_allowed` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `test_id` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Session` table. All the data in the column will be lost.
  - The primary key for the `Test` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `test_id` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `total_marks` on the `Test` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Warning` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `session_id` on the `Warning` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Warning` table. All the data in the column will be lost.
  - You are about to drop the column `warning_id` on the `Warning` table. All the data in the column will be lost.
  - You are about to drop the column `warning_type` on the `Warning` table. All the data in the column will be lost.
  - You are about to drop the `ActiveSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestQuestion` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `OptionID` to the `QuestionOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `QuestionID` to the `QuestionOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EndTime` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RejoinAllowed` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SessionID` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartTime` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TestID` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserID` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedBy` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Duration` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TestID` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalMarks` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ActiveSession` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FirstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserID` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SessionID` to the `Warning` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Timestamps` to the `Warning` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WarningID` to the `Warning` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WarningType` to the `Warning` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ActiveSession` DROP FOREIGN KEY `ActiveSession_session_id_fkey`;

-- DropForeignKey
ALTER TABLE `ActiveSession` DROP FOREIGN KEY `ActiveSession_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Log` DROP FOREIGN KEY `Log_session_id_fkey`;

-- DropForeignKey
ALTER TABLE `Log` DROP FOREIGN KEY `Log_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `QuestionOption` DROP FOREIGN KEY `QuestionOption_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_test_id_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Test` DROP FOREIGN KEY `Test_created_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `TestQuestion` DROP FOREIGN KEY `TestQuestion_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `TestQuestion` DROP FOREIGN KEY `TestQuestion_test_id_fkey`;

-- DropForeignKey
ALTER TABLE `Warning` DROP FOREIGN KEY `Warning_session_id_fkey`;

-- DropIndex
DROP INDEX `QuestionOption_question_id_fkey` ON `QuestionOption`;

-- DropIndex
DROP INDEX `Session_test_id_fkey` ON `Session`;

-- DropIndex
DROP INDEX `Session_user_id_fkey` ON `Session`;

-- DropIndex
DROP INDEX `Test_created_by_id_fkey` ON `Test`;

-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- DropIndex
DROP INDEX `Warning_session_id_fkey` ON `Warning`;

-- AlterTable
ALTER TABLE `QuestionOption` DROP PRIMARY KEY,
    DROP COLUMN `is_correct`,
    DROP COLUMN `option_id`,
    DROP COLUMN `option_text`,
    DROP COLUMN `question_id`,
    ADD COLUMN `OptionID` INTEGER NOT NULL,
    ADD COLUMN `QuestionID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`OptionID`, `QuestionID`);

-- AlterTable
ALTER TABLE `Session` DROP PRIMARY KEY,
    DROP COLUMN `end_time`,
    DROP COLUMN `rejoin_allowed`,
    DROP COLUMN `session_id`,
    DROP COLUMN `start_time`,
    DROP COLUMN `status`,
    DROP COLUMN `test_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `EndTime` DATETIME(3) NOT NULL,
    ADD COLUMN `RejoinAllowed` BOOLEAN NOT NULL,
    ADD COLUMN `SessionID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `StartTime` DATETIME(3) NOT NULL,
    ADD COLUMN `Status` VARCHAR(191) NOT NULL,
    ADD COLUMN `TestID` INTEGER NOT NULL,
    ADD COLUMN `UserID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`SessionID`);

-- AlterTable
ALTER TABLE `Test` DROP PRIMARY KEY,
    DROP COLUMN `created_at`,
    DROP COLUMN `created_by_id`,
    DROP COLUMN `description`,
    DROP COLUMN `duration`,
    DROP COLUMN `test_id`,
    DROP COLUMN `title`,
    DROP COLUMN `total_marks`,
    ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `CreatedBy` INTEGER NOT NULL,
    ADD COLUMN `Description` VARCHAR(191) NOT NULL,
    ADD COLUMN `Duration` INTEGER NOT NULL,
    ADD COLUMN `TestID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `Title` VARCHAR(191) NOT NULL,
    ADD COLUMN `TotalMarks` INTEGER NOT NULL,
    ADD PRIMARY KEY (`TestID`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `created_at`,
    DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `password_hash`,
    DROP COLUMN `role`,
    DROP COLUMN `user_id`,
    ADD COLUMN `ActiveSession` BOOLEAN NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `Email` VARCHAR(191) NOT NULL,
    ADD COLUMN `FirstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `LastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `Password` VARCHAR(191) NOT NULL,
    ADD COLUMN `Role` VARCHAR(191) NOT NULL,
    ADD COLUMN `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`UserID`);

-- AlterTable
ALTER TABLE `Warning` DROP PRIMARY KEY,
    DROP COLUMN `session_id`,
    DROP COLUMN `timestamp`,
    DROP COLUMN `warning_id`,
    DROP COLUMN `warning_type`,
    ADD COLUMN `SessionID` INTEGER NOT NULL,
    ADD COLUMN `Timestamps` DATETIME(3) NOT NULL,
    ADD COLUMN `WarningID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `WarningType` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`WarningID`);

-- DropTable
DROP TABLE `ActiveSession`;

-- DropTable
DROP TABLE `Log`;

-- DropTable
DROP TABLE `Question`;

-- DropTable
DROP TABLE `TestQuestion`;

-- CreateTable
CREATE TABLE `Questions` (
    `QuestionID` INTEGER NOT NULL AUTO_INCREMENT,
    `QuestionText` VARCHAR(191) NOT NULL,
    `Marks` INTEGER NOT NULL,
    `CorrectOption` INTEGER NOT NULL,

    PRIMARY KEY (`QuestionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Options` (
    `OptionID` INTEGER NOT NULL AUTO_INCREMENT,
    `OptionText` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`OptionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestQuestionRelation` (
    `TestID` INTEGER NOT NULL,
    `QuesID` INTEGER NOT NULL,

    PRIMARY KEY (`TestID`, `QuesID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTest` (
    `TestID` INTEGER NOT NULL,
    `UserID` INTEGER NOT NULL,

    PRIMARY KEY (`TestID`, `UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_Email_key` ON `User`(`Email`);

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_TestID_fkey` FOREIGN KEY (`TestID`) REFERENCES `Test`(`TestID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Warning` ADD CONSTRAINT `Warning_SessionID_fkey` FOREIGN KEY (`SessionID`) REFERENCES `Session`(`SessionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionOption` ADD CONSTRAINT `QuestionOption_OptionID_fkey` FOREIGN KEY (`OptionID`) REFERENCES `Options`(`OptionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionOption` ADD CONSTRAINT `QuestionOption_QuestionID_fkey` FOREIGN KEY (`QuestionID`) REFERENCES `Questions`(`QuestionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestQuestionRelation` ADD CONSTRAINT `TestQuestionRelation_TestID_fkey` FOREIGN KEY (`TestID`) REFERENCES `Test`(`TestID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestQuestionRelation` ADD CONSTRAINT `TestQuestionRelation_QuesID_fkey` FOREIGN KEY (`QuesID`) REFERENCES `Questions`(`QuestionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTest` ADD CONSTRAINT `UserTest_TestID_fkey` FOREIGN KEY (`TestID`) REFERENCES `Test`(`TestID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTest` ADD CONSTRAINT `UserTest_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;
