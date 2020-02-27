const express = require("express");
//const mysql = require("mysql");
const MongoClient=require('mongodb');
const path = require("path");
const multer = require("multer");
const DAOScores = require("./DAOScores.js");
const config = require("../config");
//const main = require("../public/js/main.js");
const bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
//hola
const Scores = express.Router();

//const pool = mysql.createPool(config.mysqlConfig);
const daoScores = new DAOScores();

Scores.use(bodyParser.json());

Scores.get("/", function(request, response){
    let datos = request.session.puntuacion;
    
    daoScores.insertScore(MongoClient, config.url, config.name, datos,function(error, id){

        if(error){
            response.status(500);
            response.render("game", { id: null, errorMsg: `${error.message}`});
        }else{
            // Incluir campos ocultos en el html, leer esos campos desde el .js
            response.status(200);            
            console.log(id);
            response.render("score", { data:datos, errorMsg: null });
        }
    });
});

module.exports = Scores;