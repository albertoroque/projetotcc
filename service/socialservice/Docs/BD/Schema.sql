-- MySQL Script generated by MySQL Workbench
-- 05/12/16 00:37:45
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ProjetoTcc
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ProjetoTcc` ;

-- -----------------------------------------------------
-- Schema ProjetoTcc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ProjetoTcc` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `ProjetoTcc` ;

-- -----------------------------------------------------
-- Table `User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User` (
  `id` BIGINT(20) NOT NULL,
  `username` VARCHAR(70) NOT NULL,
  `password` VARCHAR(45) NULL,
  `fbid` BIGINT(20) NULL,
  `avatar` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_fbid_UNIQUE` ON `User` (`id` ASC, `fbid` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Post` (
  `id` BIGINT(20) NOT NULL,
  `idUser` BIGINT(20) NOT NULL,
  `url` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Post_User`
    FOREIGN KEY (`idUser`)
    REFERENCES `User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_Post_User_idx` ON `Post` (`idUser` ASC);

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
