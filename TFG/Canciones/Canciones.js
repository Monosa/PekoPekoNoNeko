const express = require("express");
const MongoClient = require('mongodb');
var cookieParser = require('cookie-parser');
const path = require("path");
const multer = require("multer");
const DAOCanciones = require("./DAOCanciones.js");
const config = require("../config");
const bodyParser = require("body-parser");
const Canciones = express.Router();
Canciones.use(bodyParser.json()); // support json encoded bodies
Canciones.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const daoCanciones = new DAOCanciones();

Canciones.use(bodyParser.json());
Canciones.use(cookieParser('secret'));

Canciones.get("/", function (request, response) {
    request.session.multijugador = false;
    daoCanciones.getListaCanciones(MongoClient, config.url, config.name, function (error, listaCanciones) {
        if (error) {
            response.status(500);
        } else {
            response.status(200);
            response.render("songSelection", { canciones: listaCanciones, errorMsg: null });
        }
    });
});

Canciones.post("/cambiaModo", function (request, response) {
    request.session.multijugador = request.body.multi;
    request.session.save();
    response.status(200);
});

Canciones.post("/play", function (request, response) {
    let idcancion = request.body.idcancion;
    let iddificultad = request.body.iddificultad;
    let userId = request.session.currentUserId;
    let userNickname = request.session.currentUserNickname;
    let userImage = request.session.currentUserImg;
    let multi = request.session.multijugador;
    let usrMulti = request.session.currentUserImgMulti;
    daoCanciones.getCancion(MongoClient, config.url, config.name, idcancion, iddificultad, multi, function (error, cancion) {
        if (error) {
            response.status(500);
            response.render("songSelection", { canciones: null, errorMsg: `${error.message}` });
        } else {
            response.status(200);
            response.render("game", { tiempos: JSON.stringify(cancion[1]['Value']['tiempos']), song: cancion[0], multi: multi, difid: iddificultad, userid: userId, nick: userNickname, usrImg: userImage, usrMulti: usrMulti, errorMsg: null });
        }
    });
});



module.exports = Canciones;