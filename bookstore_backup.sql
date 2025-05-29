-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: bookstore
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

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
-- Current Database: `bookstore`
--

CREATE DATABASE  IF NOT EXISTS `bookstore` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ 

USE `bookstore`;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_issues`
--

DROP TABLE IF EXISTS `book_issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_issues` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `book_id` int NOT NULL,
  `user_id` int NOT NULL,
  `is_issued` enum('Yes','No','Rejected') NOT NULL DEFAULT 'No',
  `issue_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `fine` decimal(10,2) DEFAULT NULL,
  `is_returned` enum('Yes','No') NOT NULL DEFAULT 'No',
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_issues`
--

LOCK TABLES `book_issues` WRITE;
/*!40000 ALTER TABLE `book_issues` DISABLE KEYS */;
INSERT INTO `book_issues` VALUES (15,816208,19,21,'Yes','2025-03-14','2025-03-29',NULL,'Yes'),(16,350713,20,21,'Yes','2025-03-14','2025-03-29',NULL,'Yes'),(17,920201,40,21,'Yes','2025-03-14','2025-03-29',NULL,'Yes'),(19,360626,4,21,'Yes','2025-03-14','2025-03-29',NULL,'Yes'),(20,907475,19,21,'Yes','2025-03-14','2025-03-29',NULL,'Yes'),(21,993907,20,21,'Yes','2025-03-14','2025-03-19',NULL,'Yes'),(22,402278,11,21,'Yes','2025-03-14','2025-03-29',NULL,'Yes'),(23,739521,15,21,'Yes','2025-03-16','2025-03-31',NULL,'Yes'),(24,927507,18,21,'Yes','2025-03-14','2025-03-29',NULL,'Yes'),(25,749132,19,21,'Yes','2025-03-14','2025-03-29',NULL,'Yes'),(26,186881,20,21,'Yes','2025-03-14','2025-03-29',NULL,'Yes'),(27,524213,40,21,'Yes','2025-03-14','2025-03-29',NULL,'Yes'),(29,257021,11,21,'Yes',NULL,NULL,NULL,'Yes'),(30,596484,15,21,'Yes','2025-03-16','2025-03-31',NULL,'Yes'),(31,544750,18,21,'Yes',NULL,NULL,NULL,'Yes'),(33,756942,4,21,'Yes','2025-03-14','2025-03-29',NULL,'Yes'),(34,687114,18,21,'Yes',NULL,NULL,NULL,'Yes'),(35,880223,15,21,'Yes','2025-03-16','2025-03-31',NULL,'Yes'),(39,277843,15,21,'Yes','2025-03-16','2025-03-31',NULL,'Yes'),(43,100559,3,22,'Yes','2025-03-17','2025-04-01',NULL,'Yes'),(44,973310,3,22,'Yes','2025-03-17','2025-04-01',NULL,'Yes'),(47,719075,3,21,'Yes','2025-03-17','2025-04-01',NULL,'Yes'),(48,539269,3,21,'Yes','2025-03-17','2025-04-01',NULL,'Yes'),(49,148585,3,22,'Yes','2025-03-17','2025-04-01',5.00,'No');
/*!40000 ALTER TABLE `book_issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `book_name` text COLLATE utf8mb4_general_ci NOT NULL,
  `book_category` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `book_author` text COLLATE utf8mb4_general_ci NOT NULL,
  `book_desc` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `book_img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'default.jpg',
  `book_price` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `book_quantity` int NOT NULL,
  `book_purchase` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (3,'1984','Horror','George Orwell','A dystopian novel set in Airstrip One, formerly Great Britain, a province of the superstate Oceania.','1742151754827.webp','9',43,9),(4,'Pride and Prejudice','Crime','Jane Austen','A romantic novel of manners written by Jane Austen in 1813.','1742151772648.webp','800',90,0),(6,'Harry Potter and the Philosopher\'s Stone','Thriller','J.K. Rowling','The story of a young boy who discovers that he is a wizard.','1742151785866.webp','14',200,0),(7,'The Hobbit','Romance','J.R.R. Tolkien','A children\'s fantasy novel by English author J. R. R. Tolkien.','1742151797590.webp','13',80,0),(8,'The Lord of the Rings','Mystery','J.R.R. Tolkien','An epic high-fantasy novel by English author and scholar J. R. R. Tolkien.','1742151812015.webp','18',95,0),(9,'The Da Vinci Code','Fiction','Dan Brown','A mystery thriller novel by Dan Brown.','1742151825522.jpg','10',130,0),(11,'c++','Science & Technology','Saurabh Shukla','this is best saurabh shukla book','1742151838309.webp','20',9,0),(15,'Andriod Developer ','Science & Technology','Harry','Andrid developer','1742151849443.webp','25',9,0),(18,'Barbie','Crime','JK Rowling','Most girls read this book','1742151858478.webp','10',10,0),(19,'R.K. Narayan – The Guide','Education','R.K. Narayan','R.K Narayan is best known for stories based in and around the fictional village of Malgudi.','1742151874034.jpg','15',10,0),(20,'Machine Learning','Science & Technology','Asp','ML','1742151889691.webp','10',11,0),(40,'Sample Book','Horror','Arya ','If you are useless , then you read this book','1741636602342.webp','99',100000,0);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_details` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `order_quantity` int NOT NULL,
  `order_price` int NOT NULL,
  `order_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `order_phone` bigint NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,6,'1984 (x1)',1,10,'tea@gmail.com',7821893289,'2024-06-27 17:52:06'),(2,10,'1984 (x1)',1,10,'bran@gmail.com',1234567890,'2024-06-29 07:04:27'),(3,11,'The Catcher in the Rye (x2), c++ (x1)',3,43,'branko@gmail.com',1234567890,'2024-06-29 07:22:12'),(5,11,'To Kill a Mockingbird (x2)',2,25,'branko@gmail.com',1234567890,'2024-06-29 07:30:51'),(6,14,'',0,0,'email@gmail.com',9966509079,'2025-03-02 09:30:01'),(7,14,'',0,0,'email@gmail.com',9966509079,'2025-03-02 09:30:11'),(8,14,'',0,0,'email@gmail.com',9966509079,'2025-03-02 09:30:12'),(9,14,'',0,0,'email@gmail.com',9966509079,'2025-03-02 09:30:12'),(10,14,'',0,0,'email@gmail.com',9966509079,'2025-03-02 09:30:12'),(11,14,'',0,0,'email@gmail.com',9966509079,'2025-03-02 09:30:12'),(12,14,'',0,0,'email@gmail.com',9966509079,'2025-03-02 09:30:12'),(13,14,'',0,0,'email@gmail.com',9966509079,'2025-03-02 09:30:13'),(14,12,'To Kill a Mockingbird (x1)',1,13,'arya@gmail.com',9492988675,'2025-03-10 10:25:45'),(15,17,'1984 (x17), The Catcher in the Rye (x11)',28,290,'sample@gmail.com',9966509079,'2025-03-10 18:45:47'),(16,17,'',0,0,'sample@gmail.com',9966509079,'2025-03-10 18:48:47'),(17,17,'1984 (x1)',1,10,'sample@gmail.com',98765432109,'2025-03-10 18:52:06'),(18,17,'',0,0,'sample@gmail.com',98765432109,'2025-03-10 18:53:18'),(19,17,'',0,0,'sample@gmail.com',98765432109,'2025-03-10 18:54:05'),(20,17,'',0,0,'sample@gmail.com',9966509079,'2025-03-10 19:12:21'),(21,17,'1984 (x1)',1,10,'sample@gmail.com',9966509079,'2025-03-10 19:17:24'),(22,17,'1984 (x1)',1,10,'sample@gmail.com',98765432109,'2025-03-10 19:20:58'),(23,17,'',0,0,'sample@gmail.com',98765432109,'2025-03-10 19:21:00'),(24,17,'',0,0,'sample@gmail.com',98765432109,'2025-03-10 19:21:01'),(25,17,'',0,0,'sample@gmail.com',98765432109,'2025-03-10 19:21:01'),(26,17,'',0,0,'sample@gmail.com',98765432109,'2025-03-10 19:21:02'),(27,17,'',0,0,'sample@gmail.com',98765432109,'2025-03-10 19:21:02'),(28,17,'',0,0,'sample@gmail.com',98765432109,'2025-03-10 19:21:02'),(29,17,'',0,0,'sample@gmail.com',98765432109,'2025-03-10 19:21:02'),(30,17,'',0,0,'sample@gmail.com',98765432109,'2025-03-10 19:21:02'),(31,17,'1984 (x1)',1,10,'sample@gmail.com',98765432109,'2025-03-10 19:22:41'),(32,17,'',0,0,'sample@gmail.com',98765432109,'2025-03-10 19:25:41'),(33,20,'1984 (x47)',47,423,'hello@gmail.com',9876543210,'2025-03-11 14:06:32'),(34,21,'1984 (x1)',1,9,'arya7@gmail.com',9876543210,'2025-03-16 17:45:08'),(35,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 17:52:04'),(36,21,'Andriod Developer  (x1)',1,25,'arya7@gmail.com',9876543210,'2025-03-16 17:59:12'),(37,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 17:59:22'),(38,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 17:59:26'),(39,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 17:59:27'),(40,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 17:59:27'),(41,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 17:59:27'),(42,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 17:59:27'),(43,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 17:59:27'),(44,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 17:59:27'),(45,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 17:59:28'),(46,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:47'),(47,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:56'),(48,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:56'),(49,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:57'),(50,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:57'),(51,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:57'),(52,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:57'),(53,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:57'),(54,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:57'),(55,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:57'),(56,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:58'),(57,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:03:58'),(58,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:04:01'),(59,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:05:17'),(60,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:06:52'),(61,21,'',0,0,'arya7@gmail.com',9876543210,'2025-03-16 18:07:32'),(62,21,'',0,0,'arya7@gmail.com',987654321,'2025-03-16 18:19:42');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` bigint NOT NULL,
  `gender` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Yash','yash@gmail.com','yash','Pune',1234512345,'M'),(2,'','a@gmail.com','$2b$10$x9x1gvg6VwFfJ','',0,''),(3,'kat','kat@gmail.com','$2b$10$7Q0.h5gcUnFz.','mumbai',1234123412,'F'),(5,'yp','yp@gmail.com','$2b$10$O6Zg25uZl9I2V','pune',3434343434,'M'),(6,'tea','tea@gmail.com','$2b$10$oBEABn8kFNXQg','pune',1234567890,'male'),(7,'Mac','mac@gmail.com','$2b$10$A6sIBt3yqHrlO','Bangalore',8978897861,'male'),(10,'bran','bran@gmail.com','$2b$10$wPauMNsGMJc3a','mumbai',1234567890,'male'),(11,'Branko','branko@gmail.com','$2b$10$3MXOMTJRhEjH2','mumbai',1234123412,'male'),(12,'Arya','arya@gmail.com','$2b$10$rMGlcKd9lla0tG0yf8Xu4.TJ5qiUbKV.vVq30s4cIVEOetZjHpE2C','Visakapatnam',9966509079,'male'),(13,'Arya','aryabodda@gmail.com','$2b$10$gtICTnPdctBZZS11.4UWo.04444z9Fcpdj2aW8LtD1BnF4N/9e5f2','Visakapatnam',9966509079,'male'),(14,'Arya','email@gmail.com','$2b$10$DxAEeoHKtCdn4u6pcYUZXeWsFJ.yCHH0TGyIQwlNoqwW7PoECOI9O','Visakapatnam',99645678,'male'),(15,'arya','varshini17@gmail.com','$2b$10$um.7/tTFOg74Jqp5dZH3suqc9mstJnGH1yqCyS0hc8ZEo.73RGrSS','vizag',1234567890,'female'),(16,'Arya','test@gmail.com','$2b$10$Pv6EISW/rWFwsyN.BnR4/u8BxKSKDd082Tzw.f2YMpOhjFtoqhi4e','Visakapatnam',9966509079,'male'),(17,'Arya','sample@gmail.com','Arya','Visakapatnam',9876543210,'male'),(18,'ARya','arya2@gmail.com','Arya@9966509079','Visakapatnam',9,'male'),(19,'helloworld','atrftuyhrya@gmail.com','Arya@9966509079','vizag',1234567890,'male'),(20,'hello','hello@gmail.com','1234','ylm',9492988675,'female'),(21,'Arya','arya7@gmail.com','123','hmvu',987654321,'male'),(22,'Arya BOdda','arya8@gmail.com','123','jvhjh',987654321,'male');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-17  0:40:33
