"user strict";

const express = require("express");
const path = require("path");
const mysql = require("mysql");
const config = require("../config.js");
const daoUsers = require("./DAOUsers.js");

const pool = mysql.createPool(config.mysqlConfig);
//daoUsers = new DAOUsers(pool);

const users = express.Router(); // Crea la aplicación 'users' con sus propias rutas (empezando por /users)

// Registro de usuario
users.get("/signup", function(request, response){
    response.status(200);
    response.render("signup", {});
});


module.exports = users;