SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `sample` (
  `id` int(255) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `sample` (`id`, `name`) VALUES
(1, 'Mathias'),
(2, 'Erol'),
(3, 'Emil'),
(4, 'Henrik');

ALTER TABLE `sample`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sample`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;
