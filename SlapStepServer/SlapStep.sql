CREATE DATABASE SlapStep;
USE SlapStep;
drop table Users;
drop table Authorization;
drop table Token;
CREATE Table Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  phone VARCHAR(20) NOT NULL,
  name_user VARCHAR(50),
  age INT
);
CREATE Table Authorization (
  id INT PRIMARY KEY AUTO_INCREMENT,
  time_stamp DATETIME NOT NULL,
  phone VARCHAR(20) NOT NULL,
  code INT NOT NULL
);
CREATE Table Token (
  id INT PRIMARY KEY AUTO_INCREMENT,
  token VARCHAR(255) NOT NULL,
  id_user INT
);
SELECT
  *
FROM
  Users;
SELECT
  *
FROM
  Authorization;
SELECT
  *
FROM
  Token;
