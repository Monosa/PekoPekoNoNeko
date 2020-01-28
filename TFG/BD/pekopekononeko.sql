-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-01-2020 a las 10:34:06
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
(1, 1, '[{tiempo : 239, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 2820, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 5567, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 6064, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 9634, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 10359, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 13864, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 14767, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 17053, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 19239, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 21054, tecla : 107, tecla2 : 115, tipo : 50},{tiempo : 23362, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 24258, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 26939, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 28574, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 30563, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 32058, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 35653, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 36746, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 38632, tecla : 107, tecla2 : 115, tipo : 50},{tiempo : 40080, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 43988, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 45058, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 47421, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 49391, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 51352, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 52788, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 54971, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 57787, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 58687, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 61893, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 62255, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 64470, tecla : 107, tecla2 : 115, tipo : 50},{tiempo : 66076, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 69041, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 70318, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 73411, tecla : 107, tecla2 : 115, tipo : 50},{tiempo : 75302, tecla : 107, tecla2 : 115, tipo : 50},{tiempo : 77449, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 78780, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 80498, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 82379, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 84085, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 87318, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 89890, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 90749, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 93245, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 94954, tecla : 107, tecla2 : 115, tipo : 50},{tiempo : 96649, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 98863, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 101351, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 103997, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 104101, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 106530, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 108718, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 110627, tecla : 107, tecla2 : 115, tipo : 50},{tiempo : 113313, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 114187, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 116161, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 118496, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 121506, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 122744, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 124561, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 126337, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 128504, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 131635, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 132801, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 134735, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 136487, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 138985, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 140104, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 142820, tecla : 107, tecla2 : 115, tipo : 50},{tiempo : 144874, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 146377, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 149598, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 150705, tecla : 107, tecla2 : 115, tipo : 50},{tiempo : 153589, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 154424, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 157302, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 158215, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 160542, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 162456, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 165286, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 167001, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 168013, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 171625, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 173646, tecla : 106, tecla2 : 115, tipo : 25},{tiempo : 174754, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 176048, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 179871, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 180200, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 183893, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 184200, tecla : 107, tecla2 : 100, tipo : 25},{tiempo : 187933, tecla : 107, tecla2 : 115, tipo : 50},{tiempo : 189256, tecla : 106, tecla2 : 100, tipo : 25},{tiempo : 190053, tecla : 106, tecla2 : 115, tipo : 50},{tiempo : 193169, tecla : 107, tecla2 : 115, tipo : 25},{tiempo : 194366, tecla : 106, tecla2 : 100, tipo : 50},{tiempo : 196555, tecla : 107, tecla2 : 100, tipo : 50},{tiempo : 199554, tecla : 106, tecla2 : 100, tipo : 50}]');

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
