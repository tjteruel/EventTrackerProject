-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema workoutDB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `workoutDB` ;

-- -----------------------------------------------------
-- Schema workoutDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `workoutDB` DEFAULT CHARACTER SET utf8 ;
USE `workoutDB` ;

-- -----------------------------------------------------
-- Table `workout`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workout` ;

CREATE TABLE IF NOT EXISTS `workout` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `workout` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

USE `workoutDB` ;

-- -----------------------------------------------------
-- Placeholder table for view `view1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `view1` (`id` INT);

-- -----------------------------------------------------
-- View `view1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `view1`;
DROP VIEW IF EXISTS `view1` ;
USE `workoutDB`;

SET SQL_MODE = '';
DROP USER IF EXISTS workout@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'workout'@'localhost' IDENTIFIED BY 'workout';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `workout`
-- -----------------------------------------------------
START TRANSACTION;
USE `workoutDB`;
INSERT INTO `workout` (`id`, `workout`) VALUES (1, 'test');

COMMIT;

