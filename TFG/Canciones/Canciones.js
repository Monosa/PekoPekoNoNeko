const express = require("express");
//const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DAOCanciones = require("./DAOCanciones.js");
const config = require("../config");
//const main = require("../public/js/main.js");
const bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/PekoPekoNoNeko";
const Canciones = express.Router();

//const pool = mysql.createPool(config.mysqlConfig);
const daoCanciones = new DAOCanciones();

Canciones.use(bodyParser.json());

Canciones.get("/", function (request, response) {
    daoCanciones.getListaCanciones(config.MongoClient, url, function (error, listaCanciones) {
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
    let iddificultad = request.query.iddificultad;

    daoCanciones.getCancion(config.MongoClient, url, idcancion,iddificultad,function(error, cancion){

        if(error){
            response.status(500);
            response.render("songSelection", { canciones: null, errorMsg: `${error.message}`});
        }else{
            // Incluir campos ocultos en el html, leer esos campos desde el .js
            response.status(200);            
            console.log(cancion['value']['tiempos'][0]);
            response.render("game", { tiempos: JSON.stringify(cancion['value']['tiempos']), errorMsg: null });
        }
    });
});

module.exports = Canciones;