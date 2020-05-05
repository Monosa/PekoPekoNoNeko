const express = require("express");
const MongoClient = require('mongodb');
const DAOScores = require("./DAOScores.js");
const DAOCanciones = require("../Canciones/DAOCanciones.js");
const config = require("../config");
const bodyParser = require("body-parser");
const Scores = express.Router();
const daoScores = new DAOScores();
const daoCanciones = new DAOCanciones();

Scores.use(bodyParser.json());


Scores.post("/", function (request, response) {
    let datos = {
        songid: request.body.idcancion,
        difid: request.body.iddificultad,
        puntos: request.body.points,
        puntos2: request.body.points2,
        user: request.body.user,
        userImg: request.body.img,
        userMulti: request.body.imgMulti,
        imagen: request.body.imagen,
        nick: request.body.nick,
        multi: request.body.multi
    }
    console.log(datos.multi);
    daoScores.insertScore(MongoClient, config.url, config.name, datos, function (error, id) {
        if (error) {
            response.status(500);
            response.render("scoreScreen", { data: null, puntuaciones: null, errorMsg: `${error.message}` });
        } else {
            daoScores.getUserSongScores(MongoClient, config.url, config.name, datos.songid, datos.nick, function (error, result) {
                if (error) {
                    response.status(500);
                    response.redirect("songs/");
                } else {
                    response.status(200);
                    response.render("scoreScreen", { data: datos, puntuaciones: result, errorMsg: null });
                }
            });
        }
    });
});

Scores.get("/scoreslist", function (request, response) {
    daoCanciones.getListaCanciones(MongoClient, config.url, config.name, function (error, listaCanciones) {
        if (error) {
            response.status(500);
            response.render("scoresList", { canciones: null, errorMsg: `${error.message}` });
        } else {
            daoScores.getAllScores(MongoClient, config.url, config.name, function (error, listaPuntuaciones) {
                if (error) {
                    response.status(500);
                    response.redirect("songs/");
                } else {
                    response.status(200);
                    response.render("scoresList", { canciones: listaCanciones, puntuaciones: listaPuntuaciones, errorMsg: null });
                }
            });
        }
    });
});


module.exports = Scores;