const express = require("express");
const MongoClient=require('mongodb');
const DAOScores = require("./DAOScores.js");
const config = require("../config");
const bodyParser = require("body-parser");
const Scores = express.Router();
const daoScores = new DAOScores();

Scores.use(bodyParser.json());


Scores.post("/", function(request, response){
    let datos = {
        songid: request.body.idcancion,
        difid: request.body.iddificultad,
        puntos: request.body.points,
        user: request.body.user,
        imagen: request.body.imagen,
        nick: request.body.nick
    }

    daoScores.insertScore(MongoClient, config.url, config.name, datos, function(error, id){

        if(error){
            response.status(500);
            response.render("songSelectionScreen", { id: null, errorMsg: `${error.message}`});
        }else{
            daoScores.getScoresFrom(MongoClient, config.url, config.name, datos.songid, function(error, result){
                if(error){
                    response.status(500);
                    response.render("songSelectionScreen", { id: null, errorMsg: `${error.message}`});
                }else{
                    response.status(200);
                    response.render("scoreScreen", { data: datos, puntuaciones: result, errorMsg: null });
                }
            });
        }
    });
});



module.exports = Scores;