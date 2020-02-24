const express = require("express");
//const mysql = require("mysql");
const MongoClient=require('mongodb');
const path = require("path");
const multer = require("multer");
const DAOCanciones = require("./DAOCanciones.js");
const config = require("../config");
//const main = require("../public/js/main.js");
const bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
//hola
const Canciones = express.Router();

//const pool = mysql.createPool(config.mysqlConfig);
const daoCanciones = new DAOCanciones();

Canciones.use(bodyParser.json());

Canciones.get("/", function (request, response) {
    daoCanciones.getListaCanciones(MongoClient, config.url, config.name, function (error, listaCanciones) {
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

    daoCanciones.getCancion(MongoClient, config.url, config.name, idcancion,iddificultad,function(error, cancion){

        if(error){
            response.status(500);
            response.render("songSelection", { canciones: null, errorMsg: `${error.message}`});
        }else{
            // Incluir campos ocultos en el html, leer esos campos desde el .js
            response.status(200);            
            console.log(cancion[0]['Cancion']);
            response.render("game", { tiempos: JSON.stringify(cancion[1]['value']['tiempos']), song: cancion[0]['Cancion'], errorMsg: null });
        }
    });
});

module.exports = Canciones;