CREATE DATABASE SlapStep;
USE SlapStep;
drop table Users;
drop table Authorization;
drop table Token;
CREATE Table Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_user VARCHAR(50) NOT NULL,
  age INT NOT NULL
);
CREATE Table Authorization (
  id INT PRIMARY KEY AUTO_INCREMENT,
  login_user VARCHAR(50) NOT NULL,
  password_user VARCHAR(250)
);
CREATE Table Token (
  id INT PRIMARY KEY AUTO_INCREMENT,
  token VARCHAR(255) NOT NULL
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
