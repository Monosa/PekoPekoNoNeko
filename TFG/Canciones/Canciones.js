const express = require("express");
const MongoClient=require('mongodb');
var cookieParser = require('cookie-parser');
const path = require("path");
const multer = require("multer");
const DAOCanciones = require("./DAOCanciones.js");
const config = require("../config");
const bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
const Canciones = express.Router();
Canciones.use(bodyParser.json()); // support json encoded bodies
Canciones.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const daoCanciones = new DAOCanciones();

Canciones.use(bodyParser.json());
Canciones.use(cookieParser('secret'));

Canciones.get("/", function (request, response) {
    request.session.multijugador = false;
    console.log(request.session);
    daoCanciones.getListaCanciones(MongoClient, config.url, config.name, function (error, listaCanciones) {
        if (error) {
            response.status(500);
            console.log(`${error.message}`);
        } else {
            response.status(200);
            response.render("songSelection", { canciones: listaCanciones, errorMsg: null });
        }
    });
});

Canciones.post("/cambiaModo", function(request, response){
    request.session.multijugador = request.body.multi;
    request.session.save();
    console.log("Valor de session.multijugador: " + request.session.multijugador);
    response.status(200);
});

Canciones.post("/play", function(request, response){
    let idcancion = request.body.idcancion;
    let iddificultad = request.body.iddificultad;
    let user = request.session.currentUserId;
    let multi = request.session.multijugador;
    let nickname = request.session.currentUserNickname;
    let usrImg = request.session.currentUserImg;
    let usrMulti = request.session.currentUserImg2;
    daoCanciones.getCancion(MongoClient, config.url, config.name, idcancion, iddificultad, multi, function(error, cancion){
        if(error){
            response.status(500);
            response.render("songSelection", { canciones: null, errorMsg: `${error.message}`});
        }else{
            response.status(200);
            response.render("game", { tiempos: JSON.stringify(cancion[1]['Value']['tiempos']), song: cancion[0], difid: iddificultad, userid: user, nick: nickname, userImg: usrImg, usrMulti : usrMulti, errorMsg: null });
        }
    });
});



module.exports = Canciones;