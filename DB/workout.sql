-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema workoutdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `workoutdb` ;

-- -----------------------------------------------------
-- Schema workoutdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `workoutdb` DEFAULT CHARACTER SET utf8 ;
USE `workoutdb` ;

-- -----------------------------------------------------
-- Table `workout`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workout` ;

CREATE TABLE IF NOT EXISTS `workout` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `workout` VARCHAR(1000) NOT NULL,
  `category` VARCHAR(1000) NULL,
  `target_muscle` VARCHAR(1000) NULL,
  `date_completed` DATE NULL,
  `records` VARCHAR(100) NULL,
  `description` VARCHAR(4000) NOT NULL,
  `resources` VARCHAR(2000) NULL,
  `notes` VARCHAR(4000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

USE `workoutdb` ;

-- -----------------------------------------------------
-- Placeholder table for view `view1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `view1` (`id` INT);

-- -----------------------------------------------------
-- View `view1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `view1`;
DROP VIEW IF EXISTS `view1` ;
USE `workoutdb`;

SET SQL_MODE = '';
DROP USER IF EXISTS workout@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'workout'@'localhost' IDENTIFIED BY 'workout';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'workout'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `workout`
-- -----------------------------------------------------
START TRANSACTION;
USE `workoutdb`;
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (1, 'Murph', 'crossfit', 'full body', '2020-03-30', '45 minutes', '1 mile run, 100 x pull-ups, 200 x push-ups, 300 x air-squats, 1 mile run', 'weight vest - 20lbs minimum, pull-up bars', 'don\'t forget dynamic warmups!');
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (2, 'Burpees x 100', 'crossfit', 'full body', '2020-03-20', '10 minutes', '100 x burpees as fast as possible', NULL, NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (3, '5 Mile Run', 'cardio', 'cardio', '2020-02-03', '35 minutes', '5 mile run, as fast as possible', NULL, NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (4, '12 Mile Ruck March', 'cardio', 'cardio, legs, back', '2020-02-08', '2 hrs 45 minutes', '12 miles with ruck, as fast as possible', '1 x ruck, 35lbs dry weight', 'don\'t forget water next time.');
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (5, 'Chest Day (light)', 'powerlifting', 'chest', NULL, NULL, 'bench press (flat, incline, decline), cable fly, dumbbell press, push-ups', 'barbell, dumbbells, cables', NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (6, 'Chest Day (heavy)', 'powerlifting', 'chest', NULL, '245 lbs 1RM', 'bench press', 'barbell', NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (7, 'Leg Day (light)', 'powerlifting', 'legs', NULL, NULL, 'squats, leg press, leg extensions, lunges, burpees, 1 mile run', 'squat rack, barbell, leg machine', NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (8, 'Leg Day (heavy)', 'powerlifting', 'legs', NULL, '315 lbs 1RM', 'squat, tire flips', 'squat rack, barbell, tire', NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (9, 'Back Day (light)', 'powerlifting', 'back', NULL, NULL, 'deadlift, row machine, cables', 'barbell, row machine, cables', NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (10, 'Back Day (heavy)', 'powerlifting', 'back', NULL, '445 lbs 1RM', 'deadlift', 'barbell', NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (11, '8 Mile Run', 'cardio', 'cardio', NULL, '1 hr 12 minutes', '8 mile run, as fast as possible', NULL, NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (12, '2 Mile Run', 'cardio', 'cardio', NULL, '12 minutes, 30 seconds', '2 mile run, as fast as possible', NULL, NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (13, '1 Mile Run', 'cardio', 'cardio', NULL, '5 minutes, 50 seconds', '1 mile run, as fast as possible', NULL, NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (14, 'Barbell Burpees x 100', 'crossfit', 'cardio, legs', NULL, NULL, '100 burpees w/ barbell, as fast as possible', 'barbell at 135 lbs', NULL);
INSERT INTO `workout` (`id`, `workout`, `category`, `target_muscle`, `date_completed`, `records`, `description`, `resources`, `notes`) VALUES (15, 'Cindy\'s Cousin', 'crossfit', 'chest, legs, cardio', NULL, NULL, 'AMRAP in 20 minutes: 5 burpees, 10 push ups, 15 air squats', NULL, NULL);

COMMIT;

