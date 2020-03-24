const path = require("path");
const express = require("express");
const MongoClient = require('mongodb');
const DAOCanciones = require("../Canciones/DAOCanciones.js");
const config = require("../config");
const bodyParser = require("body-parser");
const Crea = express.Router();
const daoCanciones = new DAOCanciones();
const multer = require("multer");
const fs = require('fs');

var relative = "../TFG/public/uploads";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, relative);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
});
//var uploadAudio = multer({ dest: './public/media/' });
var cpUpload = upload.fields([{
  name: 'imagen',
  maxCount: 1
}, {
  name: 'song',
  maxCount: 1
}, {
  name: 'namesong',
  maxCount: 1
}, {
  name: 'nameauthor',
  maxCount: 1
}]);

Crea.use(bodyParser.json());

Crea.get("/", function (request, response) {
  response.status(200);
  response.render("creaFase1", {
    errorMsg: null
  });
});

Crea.post("/Fase2", cpUpload, function (request, response) {
  console.log("Entra");
  let datos = {
    songname: request.body.namesong,
    authorname: request.body.nameauthor,
    image: request.files['imagen'][0].originalname,
    audio: request.files['song'][0].originalname
  }

  fs.rename(request.files['imagen'][0].path, "../TFG/public/img/" + datos.image, function (err) {
    if (err) throw err;
  });
  fs.rename(request.files['song'][0].path, "../TFG/public/media/" + datos.audio, function (err) {
    if (err) throw err;
  });
  //let user = request.body.user;

  daoCanciones.insertSong(MongoClient, config.url, config.name, datos, function (error, result) {

    if (error) {
      response.status(500);
      response.render("creaFase1", {
        id: null,
        errorMsg: `${error.message}`
      });
    } else {
      // Incluir campos ocultos en el html, leer esos campos desde el .js
      response.status(200);
      let userId = request.session.currentUserId;
      // Le pasamos a la plantilla el objeto entero 
      response.render("creaFase2", {
        song: result,
        user: userId,
        errorMsg: null
      });
    }
  });
});

Crea.post("/guardarNivel", function (request, response) {
  console.log("Entrada en la función guardarNivel");
  let datos = {
    songparent: request.body.songparent,
    multi: false,
    value: JSON.parse(request.body.secValue)
  }
  let datosMulti = {
    songparent: request.body.songparent,
    multi: true,
    value: JSON.parse(request.body.secValueMulti)
  }
  daoCanciones.insertSecuencia(MongoClient, config.url, config.name, datos, function (error, result) {
    if (error) {
      response.status(500);
      response.render("creaFase1", {
        id: null,
        errorMsg: `${error.message}`
      });
    } else {
      daoCanciones.getListaCanciones(MongoClient, config.url, config.name, function (error, listaCanciones) {
        if (error) {
            response.status(500);
            console.log(`${error.message}`);
        } else {
            response.status(200);
            response.render("songSelection", { canciones: listaCanciones, errorMsg: null });
        }
    });
  }
  });
  daoCanciones.insertSecuencia(MongoClient, config.url, config.name, datosMulti, function (error, result) {
    if (error) {
      response.status(500);
      response.render("creaFase1", {
        id: null,
        errorMsg: `${error.message}`
      });
    } else {
      daoCanciones.getListaCanciones(MongoClient, config.url, config.name, function (error, listaCanciones) {
        if (error) {
            response.status(500);
            console.log(`${error.message}`);
        } else {
            response.status(200);
            response.render("songSelection", { canciones: listaCanciones, errorMsg: null });
        }
    });
  }
  });
});

module.exports = Crea;