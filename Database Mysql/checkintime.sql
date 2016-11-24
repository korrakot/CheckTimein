-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2016 at 04:29 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `checkintime`
--

-- --------------------------------------------------------

--
-- Table structure for table `dataday`
--

CREATE TABLE `dataday` (
  `id_dataDAY` int(11) NOT NULL,
  `profile_id` int(10) NOT NULL,
  `time` datetime DEFAULT NULL,
  `timelate` int(4) DEFAULT NULL,
  `timeout` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dataday`
--

INSERT INTO `dataday` (`id_dataDAY`, `profile_id`, `time`, `timelate`, `timeout`) VALUES
(1, 1, '2016-10-19 21:51:31', 51, '21:53:30'),
(2, 2, '2016-10-19 21:53:36', 714, NULL),
(3, 4, '2016-10-19 21:55:05', 0, NULL),
(4, 1, '2016-10-20 23:25:08', 805, NULL),
(5, 2, '2016-10-20 23:25:13', 805, NULL),
(6, 4, '2016-10-21 23:25:17', 805, NULL),
(7, 5, '2016-10-21 23:25:21', 805, NULL),
(34, 1, '2016-10-25 11:31:27', 91, '17:54:44'),
(35, 5, '2016-10-25 11:24:09', 92, '17:54:52'),
(36, 2, '2016-10-25 11:32:31', 93, '14:36:38'),
(37, 3, '2016-10-25 11:34:58', 95, '14:36:30'),
(38, 4, '2016-10-25 11:35:10', 95, '12:44:11'),
(39, 1, '2016-10-26 11:14:37', 15, '19:05:08'),
(40, 2, '2016-10-26 10:14:43', 15, '18:00:17'),
(41, 3, '2016-10-26 10:14:52', 15, '18:00:27'),
(42, 4, '2016-10-26 10:14:57', 15, '18:00:34'),
(43, 5, '2016-10-26 10:15:32', 16, '19:04:17'),
(44, 5, '2016-10-27 10:10:48', 11, NULL),
(45, 4, '2016-10-27 10:10:53', 11, '18:08:28'),
(46, 3, '2016-10-27 10:10:57', 11, '18:08:24'),
(47, 2, '2016-10-27 10:11:08', 11, '18:08:20'),
(48, 1, '2016-10-27 10:11:21', 11, '00:00:00'),
(49, 5, '2016-10-28 10:04:16', 4, NULL),
(51, 1, '2016-10-28 10:04:21', 4, '10:04:36'),
(52, 4, '2016-10-28 10:04:44', 5, '10:04:53'),
(53, 3, '2016-10-28 10:04:49', 5, NULL),
(54, 1, '2016-10-31 11:54:59', 115, '19:27:12'),
(55, 2, '2016-10-31 11:55:05', 115, '16:18:15'),
(56, 3, '2016-10-31 11:55:10', 115, '16:18:20'),
(57, 4, '2016-10-31 11:55:14', 115, '16:18:40'),
(58, 5, '2016-10-31 11:55:20', 115, '17:27:17'),
(59, 1, '2016-11-01 10:20:39', 21, NULL),
(60, 2, '2016-11-01 10:20:44', 21, NULL),
(61, 3, '2016-11-01 10:20:48', 21, NULL),
(62, 4, '2016-11-01 10:20:59', 21, NULL),
(63, 5, '2016-11-01 10:21:03', 21, NULL),
(64, 1, '2016-11-02 10:10:40', 11, NULL),
(65, 2, '2016-11-02 10:10:45', 11, '18:15:48'),
(66, 3, '2016-11-02 10:10:51', 11, '18:15:53'),
(67, 4, '2016-11-02 10:10:55', 11, '18:16:00'),
(68, 5, '2016-11-02 10:11:03', 11, NULL),
(69, 1, '2016-11-10 10:27:17', 22, '10:27:54'),
(70, 2, '2016-11-10 10:31:09', 26, '10:31:25'),
(71, 3, '2016-11-10 10:32:31', 28, NULL),
(80, 1, '2016-11-15 16:44:14', 399, '16:45:06'),
(82, 2, '2016-11-15 16:45:12', 400, '18:12:47'),
(83, 3, '2016-11-15 16:45:19', 400, '18:12:52'),
(84, 4, '2016-11-15 16:45:26', 400, '18:12:59'),
(85, 5, '2016-11-15 16:45:32', 401, '16:45:49'),
(86, 1, '2016-11-16 12:57:02', 172, NULL),
(87, 2, '2016-11-16 12:57:07', 172, '15:12:25'),
(88, 3, '2016-11-16 12:57:11', 172, NULL),
(89, 4, '2016-11-16 12:57:15', 172, NULL),
(90, 5, '2016-11-16 12:57:21', 172, NULL),
(91, 2, '2016-11-18 10:53:06', 48, NULL),
(92, 3, '2016-11-18 10:53:25', 48, NULL),
(93, 4, '2016-11-18 10:53:43', 49, NULL),
(111, 2, '2016-11-23 20:57:54', 653, '20:57:58');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(10) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `university` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(15) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `sex`, `name`, `surname`, `university`, `email`, `password`, `status`) VALUES
(1, 'นาย', 'กรกต', 'สุน้อง', 'มหาวิทยาลัยราชภัฎอุตรดิตถ์', 'nini@nini.nini', '1234', 1),
(2, 'นาย', 'สุเมธัส', 'สัมปทานนท์', 'มหาวิทยาลัยราชภัฏพระนครเหนือ', 'aa@aa.aa', '1234', 0),
(3, 'นาย', 'ธีรภัทร ', 'สุขสงวน', 'มหาวิทยาลัยราชภัฏพระนครเหนือ', 'bb@bb.bb', '1234', 0),
(4, 'นาย', 'พิศิษฐ์', 'สงัดกิจ', 'มหาวิทยาลัยราชภัฏพระนครเหนือ', 'cc@cc.cc', '1234', 0),
(5, 'นาย', 'บัวบุญ', 'จันทะโคตร', 'มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี', 'dd@dd.dd', '1234', 0),
(6, 'นางสาว', 'กชกร', 'ประวีท', 'มหาวิทยาลัยราชภัฎเชียงใหม่', 'kk@kk.kk', '1234', 0),
(7, 'นางสาว', 'asdasd', 'asd', 'asdqwdasd', 'asdqwd', 'asdw', 0),
(9, 'นางสาว', 'กรานต์', 'ชำนานหมอ', 'มหาวิทยาลัยราชภัฎขอนแก่น', 'abab@abab.abab', '1234', 0),
(10, 'นาย', 'ทองดี', 'ยิ้มสาด', 'มหาวิทยาลัยราชภัฎอ่อน', 'saart@gmail.com', '1234', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dataday`
--
ALTER TABLE `dataday`
  ADD PRIMARY KEY (`id_dataDAY`),
  ADD KEY `fk_dataDAY_profile_idx` (`profile_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dataday`
--
ALTER TABLE `dataday`
  MODIFY `id_dataDAY` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;
--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `dataday`
--
ALTER TABLE `dataday`
  ADD CONSTRAINT `fk_dataDAY_profile` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
