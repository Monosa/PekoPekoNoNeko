const express = require("express");
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DAOSelectionScreen = require("./DAOs/DAOSelectionScreen.js");
const config = require("./config");

const RouterSeleccion = express.Router();

const pool = mysql.createPool(config.mysqlConfig);

const daoSelectionScreen = new DAOSelectionScreen(pool);

RouterSeleccion.get("/canciones", function (request, response) {
    response.status(200);
	daoPreguntas.getListaCanciones(function (error, RouterSeleccion) {
    

    response.render("canciones", { RouterSeleccion: RouterSeleccion, errorMsg: null});
});

module.exports = RouterSeleccion;