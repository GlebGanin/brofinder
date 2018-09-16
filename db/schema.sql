CREATE DATABASE  brofinder_db;

USE brofinder_db;

CREATE TABLE users(
	id INT AUTO_INCREMENT NOT NULL,
	answer_id INT(10) NULL, 
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(16) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE answers(
	answer_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL, 
    question1 INT(1) NOT NULL,
	question2 INT(1) NOT NULL,
	question3 INT(1) NOT NULL,
	question4 INT(1) NOT NULL,
	question5 INT(1) NOT NULL,
	question6 INT(1) NOT NULL,
	question7 INT(1) NOT NULL,
	question8 INT(1) NOT NULL,
	question9 INT(1) NOT NULL,
	question10 INT(1) NOT NULL,
	PRIMARY KEY (answer_id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);
