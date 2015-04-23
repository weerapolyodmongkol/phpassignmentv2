-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 22, 2015 at 03:35 PM
-- Server version: 5.5.43
-- PHP Version: 5.3.10-1ubuntu3.18

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `phpassignmentv2`
--

-- --------------------------------------------------------

--
-- Table structure for table `phpassignmentv2_twt_cache`
--

DROP TABLE IF EXISTS `phpassignmentv2_twt_cache`;
CREATE TABLE IF NOT EXISTS `phpassignmentv2_twt_cache` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `keywords` text COLLATE utf8_unicode_ci,
  `tweets` longtext COLLATE utf8_unicode_ci,
  `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
