const express = require("express");
//const mysql = require("mysql");
const MongoClient=require('mongodb');
var cookieParser = require('cookie-parser');
const path = require("path");
const multer = require("multer");
const DAOCanciones = require("./DAOCanciones.js");
const config = require("../config");
//const main = require("../public/js/main.js");
const bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
//hola
const Canciones = express.Router();
Canciones.use(bodyParser.json()); // support json encoded bodies
Canciones.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//const pool = mysql.createPool(config.mysqlConfig);
const daoCanciones = new DAOCanciones();

Canciones.use(bodyParser.json());
Canciones.use(cookieParser('secret'));

Canciones.get("/", function (request, response) {
    request.session.multijugador = false;
    daoCanciones.getListaCanciones(MongoClient, config.url, config.name, function (error, listaCanciones) {
        //Faltan las comprobaciones
        if (error) {
            response.status(500);
            console.log(`${error.message}`);
        } else {
            response.status(200);
            response.render("songSelection", { canciones: listaCanciones, errorMsg: null });
        }
    });
});

Canciones.post("/play", function(request, response){
    let idcancion = request.body.idcancion;
    let iddificultad = request.body.iddificultad;
    let user = request.session.currentUserId;
    let multi = request.session.multijugador;
    daoCanciones.getCancion(MongoClient, config.url, config.name, idcancion, iddificultad, multi, function(error, cancion){

        if(error){
            response.status(500);
            response.render("songSelection", { canciones: null, errorMsg: `${error.message}`});
        }else{
            // Incluir campos ocultos en el html, leer esos campos desde el .js
            response.status(200);
            response.render("game", { tiempos: JSON.stringify(cancion[1]['Value']['tiempos']), song: cancion[0], difid: iddificultad, userid: user, multijugador: multi, errorMsg: null });
        }
    });
});

Canciones.post("/cambiaModo", function(request, response){
    console.log("Entrada en cambiaModo de canciones.js");
    request.session.multijugador = request.body.multi;
    console.log("Valor de session.multijugador: " + request.session.multijugador);
    response.status(200);
});

module.exports = Canciones;