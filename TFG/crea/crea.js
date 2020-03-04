const express = require("express");
const MongoClient=require('mongodb');
const DAOCanciones = require("../Canciones/DAOCanciones.js");
const config = require("../config");
const bodyParser = require("body-parser");
const Crea = express.Router();
const daoCanciones = new DAOCanciones();
const multer = require("multer");
var path = require("path");
var relative = path.relative();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, relative + '/public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });
var upload = multer({ storage: storage });
//var uploadAudio = multer({ dest: './public/media/' });
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
  let image = request.files['imagen'].originalname;
  console.log(image);
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