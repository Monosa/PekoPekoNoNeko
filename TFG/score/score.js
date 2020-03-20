const express = require("express");
const MongoClient=require('mongodb');
const DAOScores = require("./DAOScores.js");
const config = require("../config");
const bodyParser = require("body-parser");
const Scores = express.Router();
const daoScores = new DAOScores();

Scores.use(bodyParser.json());


Scores.post("/", function(request, response){
    let songid = request.body.idcancion;
    let difid = request.body.iddificultad;
    let puntos = request.body.points;
    let user = request.body.user;
    let nick = request.body.nick;
    let imagen = request.body.imagen;
    let datos = [songid, difid, puntos, user,imagen, nick];
    daoScores.insertScore(MongoClient, config.url, config.name, datos,function(error, id){

        if(error){
            response.status(500);
            response.render("songSelectionScreen", { id: null, errorMsg: `${error.message}`});
        }else{
            // Incluir campos ocultos en el html, leer esos campos desde el .js 
            daoScores.getScoresFrom(MongoClient, config.url, config.name, songid, function(error, result){
                if(error){
                    response.status(500);
                    response.render("songSelectionScreen", { id: null, errorMsg: `${error.message}`});
                }else{
                    // Incluir campos ocultos en el html, leer esos campos desde el .js
                    response.status(200);
                    response.render("scoreScreen", { data:datos, puntuaciones: result, errorMsg: null });
                }
            });
        }
    });
});



module.exports = Scores;