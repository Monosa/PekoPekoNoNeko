const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const MongoClient = require('mongodb');
//const mysqlSession = require("express-mysql-session");
const MongoStore = require('connect-mongo')(session);
const canciones = require("./Canciones/Canciones.js");
const app = express();
const config = require("./config.js");
const users = require("./users/users.js");

app.set("view engine", "ejs");  // Configura EJS como motor de plantillas
app.set("views", path.join(__dirname, "public", "views"));    // Definición del directorio donde se encuentran las plantillas

// Ficheros estáticos
const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));
app.use("/canciones", canciones);   //Manejadores de ruta de preguntas

// Middlewares
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended: true})); //body-parser


const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: new MongoStore({
        url: config.url 
    })
});

app.use(middlewareSession);

// Manejadores de ruta de usuarios
app.use("/users", users);

app.get("/", function (request, response) {
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "titlescreen.html"));
});

app.get("/play", function(request, response){
    response.status(200);
    response.sendFile(path.join(__dirname, "public", "game.html"));
})

app.listen(3000, function (err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " + err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});