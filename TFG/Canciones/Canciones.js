const express = require("express");
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DAOCanciones = require("./DAOCanciones.js");
const config = require("../config");
//const main = require("../public/js/main.js");
const bodyParser = require("body-parser");

const Canciones = express.Router();

const pool = mysql.createPool(config.mysqlConfig);
const daoCanciones = new DAOCanciones(pool);

Canciones.use(bodyParser.json());

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

Canciones.get("/play", function(request, response){
    let idcancion = request.query.idcancion;
    daoCanciones.getCancion(idcancion,function(error, cancion){
        if(error){
            response.status(500);
            response.render("songSelection", { canciones: null, errorMsg: `${error.message}`});
        }else{
            // Incluir campos ocultos en el html, leer esos campos desde el .js
            response.status(200);            
            console.log(cancion.tiempos);
            response.render("game", { tiempos: cancion.tiempos, errorMsg: null });
        }
    });
});

module.exports = Canciones;