const express = require("express");
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DAOCanciones = require("./DAOCanciones.js");
const config = require("../config");

const Canciones = express.Router();

const pool = mysql.createPool(config.mysqlConfig);

const daoCanciones = new DAOCanciones(pool);

Canciones.get("/", function (request, response) {

    daoCanciones.getListaCanciones(function (error, listaCanciones) {
        //Faltan las comprobaciones
        if (error) {
            response.status(500);
            console.log(`${error.message}`);
        } else {
            response.status(200);
            response.render("songSelection", { canciones: listaCanciones, errorMsg: null });
        }
    })
});

module.exports = Canciones;