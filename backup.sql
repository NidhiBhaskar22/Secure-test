-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: securetest
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `securetest`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `securetest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `securetest`;

--
-- Table structure for table `CorrectOption`
--

DROP TABLE IF EXISTS `CorrectOption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CorrectOption` (
  `questionId` int NOT NULL,
  `optionId` int NOT NULL,
  PRIMARY KEY (`questionId`,`optionId`),
  UNIQUE KEY `CorrectOption_questionId_key` (`questionId`),
  KEY `CorrectOption_optionId_idx` (`optionId`),
  CONSTRAINT `CorrectOption_optionId_fkey` FOREIGN KEY (`optionId`) REFERENCES `Option` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CorrectOption_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CorrectOption`
--

LOCK TABLES `CorrectOption` WRITE;
/*!40000 ALTER TABLE `CorrectOption` DISABLE KEYS */;
INSERT INTO `CorrectOption` VALUES (2,8),(3,10),(4,13);
/*!40000 ALTER TABLE `CorrectOption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Option`
--

DROP TABLE IF EXISTS `Option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Option` (
  `id` int NOT NULL AUTO_INCREMENT,
  `optionText` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Option`
--

LOCK TABLES `Option` WRITE;
/*!40000 ALTER TABLE `Option` DISABLE KEYS */;
INSERT INTO `Option` VALUES (1,'1'),(2,'4'),(3,'2'),(4,'3'),(5,'2'),(6,'1'),(7,'3'),(8,'4'),(9,'1'),(10,'8'),(11,'10'),(12,'5'),(13,'12'),(14,'56'),(15,'3'),(16,'1');
/*!40000 ALTER TABLE `Option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Question`
--

DROP TABLE IF EXISTS `Question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `questionText` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `marks` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Question`
--

LOCK TABLES `Question` WRITE;
/*!40000 ALTER TABLE `Question` DISABLE KEYS */;
INSERT INTO `Question` VALUES (1,'what is 2+2?',2),(2,'what is 2+2?',2),(3,'what is 3 + 5?',2),(4,'what is 6+6?',4);
/*!40000 ALTER TABLE `Question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuestionOption`
--

DROP TABLE IF EXISTS `QuestionOption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QuestionOption` (
  `optionId` int NOT NULL,
  `questionId` int NOT NULL,
  PRIMARY KEY (`optionId`,`questionId`),
  KEY `QuestionOption_questionId_idx` (`questionId`),
  CONSTRAINT `QuestionOption_optionId_fkey` FOREIGN KEY (`optionId`) REFERENCES `Option` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `QuestionOption_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuestionOption`
--

LOCK TABLES `QuestionOption` WRITE;
/*!40000 ALTER TABLE `QuestionOption` DISABLE KEYS */;
INSERT INTO `QuestionOption` VALUES (1,1),(2,1),(3,1),(4,1),(5,2),(6,2),(7,2),(8,2),(9,3),(10,3),(11,3),(12,3),(13,4),(14,4),(15,4),(16,4);
/*!40000 ALTER TABLE `QuestionOption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `endTime` datetime(3) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `rejoinAllowed` tinyint(1) NOT NULL DEFAULT '0',
  `score` int DEFAULT NULL,
  `startTime` datetime(3) NOT NULL,
  `status` enum('PENDING','IN_PROGRESS','COMPLETED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `testId` int NOT NULL,
  `userId` int NOT NULL,
  `warningCount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Session_userId_testId_idx` (`userId`,`testId`),
  KEY `Session_status_idx` (`status`),
  KEY `Session_testId_fkey` (`testId`),
  CONSTRAINT `Session_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test` (`TestID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
INSERT INTO `Session` VALUES ('2025-02-27 12:27:22.624',1,0,NULL,'2025-02-27 11:27:22.624','COMPLETED',1,2,6),('2024-02-27 13:00:00.000',2,0,NULL,'2024-02-27 12:00:00.000','PENDING',1,4,0);
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Test`
--

DROP TABLE IF EXISTS `Test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Test` (
  `TestID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Duration` int NOT NULL,
  `TotalMarks` int NOT NULL,
  `CreatedBy` int NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`TestID`),
  KEY `Test_CreatedBy_fkey` (`CreatedBy`),
  CONSTRAINT `Test_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Test`
--

LOCK TABLES `Test` WRITE;
/*!40000 ALTER TABLE `Test` DISABLE KEYS */;
INSERT INTO `Test` VALUES (1,'New Sample Test','This is a sample test for API testing',60,100,3,'2025-02-27 10:04:53.961'),(2,'numbers','Counting',60,10,3,'2025-02-27 10:05:22.227'),(3,'Counting ','Count numbers',5,4,3,'2025-02-28 09:29:36.894');
/*!40000 ALTER TABLE `Test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TestQuestionRelation`
--

DROP TABLE IF EXISTS `TestQuestionRelation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TestQuestionRelation` (
  `questionId` int NOT NULL,
  `testId` int NOT NULL,
  PRIMARY KEY (`testId`,`questionId`),
  KEY `TestQuestionRelation_testId_idx` (`testId`),
  KEY `TestQuestionRelation_questionId_fkey` (`questionId`),
  CONSTRAINT `TestQuestionRelation_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `TestQuestionRelation_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test` (`TestID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TestQuestionRelation`
--

LOCK TABLES `TestQuestionRelation` WRITE;
/*!40000 ALTER TABLE `TestQuestionRelation` DISABLE KEYS */;
INSERT INTO `TestQuestionRelation` VALUES (1,3),(2,3),(3,3),(4,3);
/*!40000 ALTER TABLE `TestQuestionRelation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `LastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ActiveSession` tinyint(1) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `User_Email_key` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'User2','User2','user2@gmail.com','$2a$10$PuUWRyu8L4sUggFn2bZ/x.9jv9XNg3itedBIjJBAW6I45Z4QO7JhW','USER',0),(2,'User1','User1','user1@gmail.com','$2a$10$9352z1/MyPFowoKGvg58He3bXP3wF4tdfQ55cIGwP.mKvEyli.BC.','USER',0),(3,'Admin','Admin','Admin@gmail.com','$2a$10$iKrQvLdzPsZzoCDbgNtYnuikFiDFRDXIBKiXAGg828tBzX6H4LGEq','ADMIN',0),(4,'Nidhi','Nidhi','bhaskarnidhi2206@gmail.com','$2a$10$jtolOHHO0gSSmX8781v5muUGrBoSGY7aB51T3XO18jvM.erYyDGaW','ADMIN',0);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserQuestionAttempt`
--

DROP TABLE IF EXISTS `UserQuestionAttempt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserQuestionAttempt` (
  `sessionId` int NOT NULL,
  `questionId` int NOT NULL,
  `chosenOptionId` int NOT NULL,
  `timestamp` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`sessionId`,`questionId`),
  KEY `UserQuestionAttempt_chosenOptionId_idx` (`chosenOptionId`),
  KEY `UserQuestionAttempt_questionId_fkey` (`questionId`),
  CONSTRAINT `UserQuestionAttempt_chosenOptionId_fkey` FOREIGN KEY (`chosenOptionId`) REFERENCES `Option` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserQuestionAttempt_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserQuestionAttempt_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserQuestionAttempt`
--

LOCK TABLES `UserQuestionAttempt` WRITE;
/*!40000 ALTER TABLE `UserQuestionAttempt` DISABLE KEYS */;
INSERT INTO `UserQuestionAttempt` VALUES (1,2,8,'2025-02-28 09:44:41.414');
/*!40000 ALTER TABLE `UserQuestionAttempt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserTest`
--

DROP TABLE IF EXISTS `UserTest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserTest` (
  `assignedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `testId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`testId`,`userId`),
  KEY `UserTest_userId_idx` (`userId`),
  CONSTRAINT `UserTest_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test` (`TestID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserTest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserTest`
--

LOCK TABLES `UserTest` WRITE;
/*!40000 ALTER TABLE `UserTest` DISABLE KEYS */;
INSERT INTO `UserTest` VALUES ('2025-02-27 10:09:03.911',1,2),('2025-02-28 10:31:55.559',1,4),('2025-02-27 10:08:25.732',2,1),('2025-02-27 10:08:56.110',2,2),('2025-02-28 11:27:00.838',3,4);
/*!40000 ALTER TABLE `UserTest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Warning`
--

DROP TABLE IF EXISTS `Warning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Warning` (
  `id` int NOT NULL AUTO_INCREMENT,
  `warningType` enum('TAB_SWITCH','COPY_PASTE','RIGHT_CLICK','INSPECT_ELEMENT','WINDOW_CHANGE') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Warning_warningType_idx` (`warningType`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Warning`
--

LOCK TABLES `Warning` WRITE;
/*!40000 ALTER TABLE `Warning` DISABLE KEYS */;
INSERT INTO `Warning` VALUES (1,'TAB_SWITCH'),(2,'TAB_SWITCH'),(3,'TAB_SWITCH'),(6,'COPY_PASTE'),(4,'INSPECT_ELEMENT'),(5,'WINDOW_CHANGE');
/*!40000 ALTER TABLE `Warning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WarningSessions`
--

DROP TABLE IF EXISTS `WarningSessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WarningSessions` (
  `sessionId` int NOT NULL,
  `warningId` int NOT NULL,
  PRIMARY KEY (`sessionId`,`warningId`),
  KEY `WarningSessions_warningId_idx` (`warningId`),
  CONSTRAINT `WarningSessions_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WarningSessions_warningId_fkey` FOREIGN KEY (`warningId`) REFERENCES `Warning` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WarningSessions`
--

LOCK TABLES `WarningSessions` WRITE;
/*!40000 ALTER TABLE `WarningSessions` DISABLE KEYS */;
INSERT INTO `WarningSessions` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6);
/*!40000 ALTER TABLE `WarningSessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-01 11:08:36
