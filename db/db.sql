SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `user` (
  `user_id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(255),
  `email` VARCHAR(255) UNIQUE KEY,
  `password` TEXT,
  KEY `Pkey` (`user_id`)
);

INSERT INTO user(name, email, password) VALUES("John", "John@edu.ucl.dk", "1234");
INSERT INTO user(name, email, password) VALUES("Henrik", "Henrik@edu.ucl.dk", "1234");
INSERT INTO user(name, email, password) VALUES("Matias", "Matias@edu.ucl.dk", "1234");


CREATE TABLE `friend` (
  `user_id` INTEGER not null,
  `friend_user_id` INTEGER not null,
  KEY `Fkey` (`user_id`)
);

INSERT INTO friend(user_id, friend_user_id) VALUES(1, 2);
INSERT INTO friend(user_id, friend_user_id) VALUES(1, 3);

CREATE TABLE `images` (
  `image_id` INTEGER AUTO_INCREMENT,
  `user_id` INTEGER not null,
  `path` VARCHAR(255) not null,
  KEY `Pkey` (`image_id`),
  KEY `Fkey` (`user_id`)
);

INSERT INTO images(user_id, path) VALUES(1, "./images/test1");
INSERT INTO images(user_id, path) VALUES(1, "./images/test2");

CREATE TABLE `comment` (
  `comment_id` INTEGER AUTO_INCREMENT,
  `user_id` INTEGER not null,
  `image_id` INTEGER not null,
  `text` TEXT not null,
  KEY `Pkey` (`comment_id`),
  KEY `Fkey` (`user_id`, `image_id`)
);

INSERT INTO comment(user_id, image_id, text) VALUES(1, 1, "What a great picture!");
INSERT INTO comment(user_id, image_id, text) VALUES(1, 1, "WOW!");
INSERT INTO comment(user_id, image_id, text) VALUES(2, 1, "What a terrible picture!");

CREATE TABLE `shared_images` (
  `image_id` INTEGER NOT NULL,
  `user_id` INTEGER NOT NULL,
  KEY `Fkey` (`image_id`, `user_id`)
);