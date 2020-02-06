-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-02-2020 a las 12:32:24
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
(1, 1, '{ \"tiempos\": [ {\"tiempo\": 350, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 2767, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 50},{\"tiempo\": 5825, \"tecla\": [102, 106], \"tecla2\": [102, 106], \"tipo\": 25},{\"tiempo\": 7767, \"tecla\": [100, 107], \"tecla2\": [102, 106], \"tipo\": 25},{\"tiempo\": 8555, \"tecla\": [102, 106], \"tecla2\": [100, 107], \"tipo\": 25},{\"tiempo\": 10633, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 12220, \"tecla\": [106, 102], \"tecla2\": [102, 106], \"tipo\": 50},{\"tiempo\": 15733, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 17413, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 18305, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 21700, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 22227, \"tecla\": [100, 107], \"tecla2\": [106, 102], \"tipo\": 25},{\"tiempo\": 24749, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 50},{\"tiempo\": 26375, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 28240, \"tecla\": [100, 107], \"tecla2\": [100, 107], \"tipo\": 25},{\"tiempo\": 30232, \"tecla\": [100, 107], \"tecla2\": [106, 102], \"tipo\": 25},{\"tiempo\": 32429, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 34459, \"tecla\": [100, 107], \"tecla2\": [107, 100], \"tipo\": 25},{\"tiempo\": 37611, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 38755, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 50},{\"tiempo\": 41359, \"tecla\": [102, 106], \"tecla2\": [106, 102], \"tipo\": 25},{\"tiempo\": 42400, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 44035, \"tecla\": [102, 106], \"tecla2\": [106, 102], \"tipo\": 25},{\"tiempo\": 46885, \"tecla\": [102, 106], \"tecla2\": [106, 102], \"tipo\": 25},{\"tiempo\": 49488, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 50786, \"tecla\": [107, 100], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 53786, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 50},{\"tiempo\": 55325, \"tecla\": [100, 107], \"tecla2\": [106, 102], \"tipo\": 25},{\"tiempo\": 57293, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 58329, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 60918, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 62139, \"tecla\": [102, 106], \"tecla2\": [102, 106], \"tipo\": 25},{\"tiempo\": 65045, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 67364, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 69761, \"tecla\": [100, 107], \"tecla2\": [102, 106], \"tipo\": 25},{\"tiempo\": 71416, \"tecla\": [100, 107], \"tecla2\": [106, 102], \"tipo\": 25},{\"tiempo\": 73799, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 74955, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 77986, \"tecla\": [100, 107], \"tecla2\": [102, 106], \"tipo\": 25},{\"tiempo\": 79312, \"tecla\": [100, 107], \"tecla2\": [106, 102], \"tipo\": 25},{\"tiempo\": 81072, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 83283, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 84799, \"tecla\": [100, 107], \"tecla2\": [100, 107], \"tipo\": 25},{\"tiempo\": 86807, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 88069, \"tecla\": [102, 106], \"tecla2\": [100, 107], \"tipo\": 25},{\"tiempo\": 90761, \"tecla\": [102, 106], \"tecla2\": [100, 107], \"tipo\": 25},{\"tiempo\": 93465, \"tecla\": [107, 100], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 94291, \"tecla\": [102, 106], \"tecla2\": [106, 102], \"tipo\": 25},{\"tiempo\": 96183, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 98352, \"tecla\": [100, 107], \"tecla2\": [107, 100], \"tipo\": 25},{\"tiempo\": 100712, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 103162, \"tecla\": [107, 100], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 104723, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 106045, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 25},{\"tiempo\": 109700, \"tecla\": [106, 102], \"tecla2\": [102, 106], \"tipo\": 50},{\"tiempo\": 111945, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 112808, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 114723, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 117070, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 118188, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 121775, \"tecla\": [102, 106], \"tecla2\": [102, 106], \"tipo\": 25},{\"tiempo\": 122845, \"tecla\": [100, 107], \"tecla2\": [102, 106], \"tipo\": 25},{\"tiempo\": 124007, \"tecla\": [102, 106], \"tecla2\": [102, 106], \"tipo\": 25},{\"tiempo\": 127518, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 128868, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 130310, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 132101, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 134432, \"tecla\": [100, 107], \"tecla2\": [100, 107], \"tipo\": 25},{\"tiempo\": 136667, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 138636, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 50},{\"tiempo\": 140811, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 25},{\"tiempo\": 142490, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 145871, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 146104, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 149405, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 25},{\"tiempo\": 150004, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 50},{\"tiempo\": 153823, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 154431, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 157686, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 50},{\"tiempo\": 158710, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 160533, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 162784, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 165758, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 50},{\"tiempo\": 166178, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 169508, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 170247, \"tecla\": [106, 102], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 172353, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 175031, \"tecla\": [106, 102], \"tecla2\": [106, 102], \"tipo\": 50},{\"tiempo\": 176764, \"tecla\": [107, 100], \"tecla2\": [102, 106], \"tipo\": 50},{\"tiempo\": 178066, \"tecla\": [100, 107], \"tecla2\": [100, 107], \"tipo\": 25},{\"tiempo\": 180815, \"tecla\": [100, 107], \"tecla2\": [100, 107], \"tipo\": 25},{\"tiempo\": 183854, \"tecla\": [102, 106], \"tecla2\": [100, 107], \"tipo\": 25},{\"tiempo\": 184355, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 187977, \"tecla\": [102, 106], \"tecla2\": [106, 102], \"tipo\": 25},{\"tiempo\": 189525, \"tecla\": [100, 107], \"tecla2\": [107, 100], \"tipo\": 25},{\"tiempo\": 191099, \"tecla\": [106, 102], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 193313, \"tecla\": [107, 100], \"tecla2\": [107, 100], \"tipo\": 50},{\"tiempo\": 194691, \"tecla\": [107, 100], \"tecla2\": [100, 107], \"tipo\": 50},{\"tiempo\": 196161, \"tecla\": [102, 106], \"tecla2\": [107, 100], \"tipo\": 25},{\"tiempo\": 198691, \"tecla\": [100, 107], \"tecla2\": [102, 106], \"tipo\": 25}] }');

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
