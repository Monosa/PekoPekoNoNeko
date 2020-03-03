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
    let imagen = request.body.imagen;
    let datos = [songid, difid, puntos, user,imagen];
    console.log(user);
    daoScores.insertScore(MongoClient, config.url, config.name, datos,function(error, id){

        if(error){
            response.status(500);
            response.render("game", { id: null, errorMsg: `${error.message}`});
        }else{
            // Incluir campos ocultos en el html, leer esos campos desde el .js
            response.status(200);            
            console.log(id);
            response.render("scoreScreen", { data:datos, errorMsg: null });
        }
    });
});



module.exports = Scores;