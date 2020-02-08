-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-02-2020 a las 12:50:53
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pekopekononeko`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secuencias`
--

CREATE TABLE `secuencias` (
  `parent` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `secuencias`
--

INSERT INTO `secuencias` (`parent`, `id`, `value`) VALUES
(1, 1, '{ \"tiempos\": [ {\"tiempo\": 480, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 3206, \"tecla\": [107, 100], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 5694, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 7313, \"tecla\": [100, 107], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 9012, \"tecla\": [106, 102], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 10555, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 12895, \"tecla\": [102, 106], \"tecla2\": [102, 106], \"tipo\": 300},{\"tiempo\": 14078, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 17695, \"tecla\": [106, 102], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 19439, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 21387, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 22258, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 24813, \"tecla\": [100, 107], \"tecla2\": [100, 107], \"tipo\": 300},{\"tiempo\": 26955, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 28876, \"tecla\": [100, 107], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 31051, \"tecla\": [100, 107], \"tecla2\": [106, 102], \"tipo\": 300},{\"tiempo\": 33837, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 35472, \"tecla\": [102, 106], \"tecla2\": [106, 102], \"tipo\": 300},{\"tiempo\": 36041, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 38124, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 41707, \"tecla\": [106, 102], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 43236, \"tecla\": [102, 106], \"tecla2\": [102, 106], \"tipo\": 300},{\"tiempo\": 44399, \"tecla\": [100, 107], \"tecla2\": [106, 102], \"tipo\": 300},{\"tiempo\": 46258, \"tecla\": [100, 107], \"tecla2\": [106, 102], \"tipo\": 300},{\"tiempo\": 49352, \"tecla\": [102, 106], \"tecla2\": [106, 102], \"tipo\": 300},{\"tiempo\": 51146, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 52934, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 54661, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 57918, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 58721, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 61114, \"tecla\": [100, 107], \"tecla2\": [106, 102], \"tipo\": 300},{\"tiempo\": 62349, \"tecla\": [106, 102], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 64152, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 66742, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 69087, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 71330, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 72143, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 75852, \"tecla\": [102, 106], \"tecla2\": [100, 107], \"tipo\": 300},{\"tiempo\": 76842, \"tecla\": [107, 100], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 78426, \"tecla\": [100, 107], \"tecla2\": [102, 106], \"tipo\": 300},{\"tiempo\": 80725, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 82629, \"tecla\": [107, 100], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 85696, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 87558, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 89807, \"tecla\": [100, 107], \"tecla2\": [102, 106], \"tipo\": 300},{\"tiempo\": 91352, \"tecla\": [106, 102], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 92381, \"tecla\": [106, 102], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 95711, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 97162, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 98646, \"tecla\": [102, 106], \"tecla2\": [102, 106], \"tipo\": 300},{\"tiempo\": 101601, \"tecla\": [100, 107], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 103550, \"tecla\": [100, 107], \"tecla2\": [100, 107], \"tipo\": 300},{\"tiempo\": 104310, \"tecla\": [100, 107], \"tecla2\": [106, 102], \"tipo\": 300},{\"tiempo\": 107506, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 109245, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 111105, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 113096, \"tecla\": [102, 106], \"tecla2\": [100, 107], \"tipo\": 300},{\"tiempo\": 115921, \"tecla\": [107, 100], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 117893, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 118552, \"tecla\": [106, 102], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 120494, \"tecla\": [102, 106], \"tecla2\": [102, 106], \"tipo\": 300},{\"tiempo\": 123917, \"tecla\": [100, 107], \"tecla2\": [100, 107], \"tipo\": 300},{\"tiempo\": 124952, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 126905, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 129935, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 131072, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 133323, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 135572, \"tecla\": [100, 107], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 137379, \"tecla\": [102, 106], \"tecla2\": [100, 107], \"tipo\": 300},{\"tiempo\": 139266, \"tecla\": [107, 100], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 140716, \"tecla\": [107, 100], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 142421, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 145792, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 146927, \"tecla\": [100, 107], \"tecla2\": [102, 106], \"tipo\": 300},{\"tiempo\": 148027, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 150056, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 152287, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 154431, \"tecla\": [100, 107], \"tecla2\": [100, 107], \"tipo\": 300},{\"tiempo\": 156256, \"tecla\": [106, 102], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 158300, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 160202, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 162893, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 165729, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 167219, \"tecla\": [100, 107], \"tecla2\": [102, 106], \"tipo\": 300},{\"tiempo\": 168538, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 170095, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 173672, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 174614, \"tecla\": [107, 100], \"tecla2\": [106, 102], \"tipo\": 600},{\"tiempo\": 177202, \"tecla\": [100, 107], \"tecla2\": [102, 106], \"tipo\": 300},{\"tiempo\": 179127, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 180618, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 183260, \"tecla\": [106, 102], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 185471, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 186028, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 600},{\"tiempo\": 188387, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 300},{\"tiempo\": 191378, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 192117, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 194423, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 600},{\"tiempo\": 197214, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 600},{\"tiempo\": 199836, \"tecla\": [100, 107], \"tecla2\": [106, 102], \"tipo\": 300}] }');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `songs`
--

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `autor` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `songs`
--

INSERT INTO `songs` (`id`, `nombre`, `autor`) VALUES
(1, 'Fade', 'Alan Walker');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `secuencias`
--
ALTER TABLE `secuencias`
  ADD PRIMARY KEY (`parent`,`id`);

--
-- Indices de la tabla `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `secuencias`
--
ALTER TABLE `secuencias`
  ADD CONSTRAINT `secuencias_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
