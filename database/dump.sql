-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 14, 2019 at 05:34 PM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prov`
--

-- --------------------------------------------------------

--
-- Table structure for table `goals`
--

CREATE TABLE `goals` (
  `id` mediumint(8) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `goals`
--

INSERT INTO `goals` (`id`, `name`) VALUES
(1, 'art'),
(2, 'hands-on'),
(3, 'creative'),
(4, 'crafts');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` mediumint(8) NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `project_id` mediumint(8) NOT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `filename`, `project_id`, `url`) VALUES
(1, '/images/stick-figure.png', 1, NULL),
(2, '/images/name-beads.png', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` mediumint(8) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `name`) VALUES
(1, 'sticks'),
(2, 'paper'),
(3, 'glue'),
(4, 'googly-eyes'),
(5, 'name-print-outs'),
(6, 'letter-beads');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` mediumint(8) NOT NULL,
  `user_id` mediumint(8) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` text NOT NULL,
  `set_up` text NOT NULL,
  `outcomes` text NOT NULL,
  `youtubeLink` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `user_id`, `name`, `description`, `set_up`, `outcomes`, `youtubeLink`) VALUES
(1, 101, 'stick-figures', 'students will create stick figures using natural materials', 'lay out materials on the table, separate materials by category, lay out paper and glue', 'Students responded well to the hands on project. The use of natural materials helped provide tactile response.', NULL),
(2, 101, 'name-beads', 'Students will spell out their name using letter beads, with guidance of a name print out.', 'Print out paper name print-outs, leave room for students to glue letter beads, supply letter beads (do not sort by letter) and glue.', 'Students were able to train hand-eye coordination with the use of small letter beads, as well as training reading comprehension.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_goals`
--

CREATE TABLE `project_goals` (
  `project_id` mediumint(8) NOT NULL,
  `goal_id` mediumint(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_goals`
--

INSERT INTO `project_goals` (`project_id`, `goal_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 7),
(2, 8),
(2, 2),
(2, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `project_material`
--

CREATE TABLE `project_material` (
  `project_id` mediumint(8) NOT NULL,
  `material_id` mediumint(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_material`
--

INSERT INTO `project_material` (`project_id`, `material_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 3),
(2, 5),
(2, 6);

-- --------------------------------------------------------

--
-- Table structure for table `project_rating`
--

CREATE TABLE `project_rating` (
  `project_id` mediumint(8) NOT NULL,
  `rating` float NOT NULL DEFAULT '0',
  `count` mediumint(8) NOT NULL DEFAULT '0',
  `total_rating` mediumint(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_rating`
--

INSERT INTO `project_rating` (`project_id`, `rating`, `count`, `total_rating`) VALUES
(1, 4.72131, 61, 288),
(2, 4.97661, 171, 851);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` mediumint(10) NOT NULL,
  `user_id` mediumint(8) NOT NULL,
  `project_id` mediumint(8) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `project_id`, `comment`, `time`) VALUES
(1, 103, 1, 'Great project! My kids really liked working with natural materials.', '2019-10-25 00:00:00'),
(32, 115, 63, 'Get this filth out of my house', '2019-11-01 03:25:35');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` mediumint(8) NOT NULL,
  `name` varchar(60) NOT NULL,
  `years` tinyint(2) NOT NULL,
  `about_me` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `creation` datetime NOT NULL,
  `username` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `name`, `years`, `about_me`, `avatar`, `creation`, `username`) VALUES
(101, 'Anjaleena Barclay', 12, 'I love what I do, and would love to do it my entire life!', '/images/apple.jpg', '2019-10-23 20:00:55', 'ProvPro'),
(102, 'Dan Paschal', 5, 'I love PHP', '/images/apple.jpg', '2019-10-23 20:17:51', 'phpfan'),
(103, 'Edward Lee', 12, 'node node node', '/images/apple.jpg', '2019-10-23 22:33:39', 'elee5696'),
(109, 'Brena Patel', 1, 'React!', '/images/apple.jpg', '2019-10-23 22:57:18', 'BPatel'),
(111, 'Brena Patel', 2, 'I am a preschool teacher that loves to teach arts and crafts ', '/images/slime1.jpeg', '2019-11-01 03:09:49', 'BrenaP'),
(112, 'Edward Lee', 4, 'I love to code! ', '/images/puffypaint2.jpeg', '2019-11-01 03:12:01', 'Elee'),
(113, 'Bob Ross', 22, 'I love teaching art!!', '/images/BobRoss.jpg', '2019-11-01 03:12:07', 'BOBROSS'),
(114, 'Tamur Padath', 2, 'I love W3Schools, best place to learn how to code!', '/images/tamur.png', '2019-11-01 03:17:11', 'thefinger'),
(115, 'Tim Davis', 6, 'I love cookies! ðŸª', '/images/timD.jpeg', '2019-11-01 03:24:56', 'thebearingedge'),
(116, 'Lena Porina', 32, 'I am a preschool teacher and I love introducing new exciting activities in class so that kids have fun learning', '/images/schoolteacher21.jpeg', '2019-11-01 03:29:27', 'porinalena');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `goals`
--
ALTER TABLE `goals`
  MODIFY `id` mediumint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` mediumint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` mediumint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` mediumint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` mediumint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` mediumint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
