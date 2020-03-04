const express = require("express");
const MongoClient=require('mongodb');
const DAOCanciones = require("../Canciones/DAOCanciones.js");
const config = require("../config");
const bodyParser = require("body-parser");
const Crea = express.Router();
const daoCanciones = new DAOCanciones();
const multer = require("multer");
var upload = multer({ dest: './public/uploads/' });
var uploadAudio = multer({ dest: './public/media/' });
var cpUpload = upload.fields([{ name: 'imagen', maxCount: 1 },{ name: 'song', maxCount: 1},{ name: 'namesong', maxCount: 1 }, { name: 'nameauthor', maxCount: 1 }]);

Crea.use(bodyParser.json());

Crea.get("/", function(request, response){
    response.status(200);
    response.render("creaFase1", {errorMsg: null});
});

Crea.post("/Fase2", cpUpload,function(request, response){
  console.log("Entra");
  let songname = request.body.namesong;
  let authorname = request.body.nameauthor;
  let image = request.files[''][0];
  //let user = request.body.user;
  let audio = request.body.song;
  let datos = [songname, authorname, image, audio];
  daoCanciones.insertSong(MongoClient, config.url, config.name, datos,function(error, result){

      if(error){
          response.status(500);
          response.render("creaFase1", { id: null, errorMsg: `${error.message}`});
      }else{
          // Incluir campos ocultos en el html, leer esos campos desde el .js
          response.status(200);            
          //result deberia tener el Songid que le ha dado la bd y le damos nivel de dificultad maximo(3)
          res = [result[0],3];
          response.render("creaFase2", { data:res, errorMsg: null });
      }
  });
});



module.exports = Crea;