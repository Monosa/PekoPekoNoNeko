
const express = require("express");
const path = require("path");
//const mysql = require("mysql");
const MongoClient=require('mongodb');
const multer = require("multer");
const config = require("../config.js");
const DAOUsers = require("./DAOUsers.js");

const users = express.Router(); // Crea la aplicación 'users' con sus propias rutas (empezando por /users)

//const pool = mysql.createPool(config.mysqlConfig);
const daoUsers = new DAOUsers();

// Middleware que limita el acceso a la sesión sin estar loggeado
function middlewareLogin(request, response, next) {
    if (request.session.currentUserNickname !== undefined) {
        next();
    }
    else {
        response.redirect("/users/login");
    }
}

function middlewareLogged(request, response, next){
    if(request.session.currentUserNickname !== undefined){
        response.redirect("/users/sesion");
    }
    else{
        next();
    }
}

const multerFactory = multer({ storage: multer.memoryStorage() });

// Registro de usuario
users.get("/signup", middlewareLogged, function(request, response){
    response.status(200);
    response.render("signup", {errorMsg: null});
});

users.post("/signup", function (request, response) {
    //  Comprobar que los campos obligatorios no estén vacíos
    request.checkBody("email_user", "El email del usuario está vacío").notEmpty();
    request.checkBody("password_user", "La contraseña está vacía").notEmpty();
    request.checkBody("name_user", "El nombre del usuario está vacío").notEmpty();
    request.checkBody("nickname_user", "El nickname del usuario está vacío").notEmpty();
    //  Comprobar que la contraseña tenga un mínimo y un máximo de longitud
    request.checkBody("password_user", "La contraseña no es válida").isLength({ min: 4, max: 20 });
    //  Comprobar que el formato del email sea correcto
    request.checkBody("email_user", "La dirección de correo no es válida").isEmail();

    request.getValidationResult().then(function (result) {
        // El método isEmpty() devuelve true si las comprobaciones
        // no han detectado ningún error
        if (result.isEmpty()) {
            let user = {};

            user.email = request.body.email_user;
            user.password = request.body.password_user;
            user.name = request.body.name_user;
            user.nickname = request.body.nickname_user;
            user.multi = false;
            user.image = request.body.userAvatar+".png";
            
            daoUsers.checkUser(MongoClient, config.url, config.name, user.nickname, function(err, usersWithNickname){
                if(err){
                    response.status(500);
                    response.render("signup", { errorMsg: `${error.message}` });
                }if(usersWithNickname.length !== 0){
                    response.status(200);
                    response.render("signup", { errorMsg: "Ese nickname ya está cogido. Por favor, elige otro." });
                }else{
                    daoUsers.insertUser(MongoClient, config.url, config.name, user, function (error, id) {
                        if (error) {
                            response.status(500);
                            response.render("signup", { errorMsg: `${error.message}` });
                        } else {
                            user.id = id;
                            response.status(200);
                            request.session.currentUserNickname = user.nickname;
                            request.session.currentUserId = user.id;
                            request.session.multijugador = user.multi;
                            request.session.currentUserImg = user.image;
                            request.session.currentUserImg2 = user.image;
                            response.redirect("/users/sesion");
                        }
                    });
                }
            });            
        } else {
            response.status(200);
            //Se meten todos los mensajes de error en un array
            let mensaje = result.array().map(n => " " + n.msg);
            response.render("signup", { errorMsg: mensaje });
        }
    });
});


// Perfil de usuario: la sesion es lo que está fallando
users.get("/sesion", middlewareLogin, function(request, response){
    daoUsers.getUser(MongoClient, config.url, config.name, request.session.currentUserId, function(error, user){
        if(error){
            response.status(500);
        }else{
            response.status(200);
            response.render("sesion", {user: user});
        }
    });
});

// Lee la imagen del usuario de la base de datos y la devuelve
users.get("/image/:id", function (request, response) {
    let n = Number(request.params.id);

    if (isNaN(n)) {
        response.status(400);
        response.end("Petición incorrecta");
    } else {
        daoUser.getUserImage(n, function (err, image) {
            if (image) {
                response.end(image);
            } else {
                response.status(404);
                response.end("Not found");
            }
        });
    }
});

// En caso de que el usuario no tenga imagen de perfil, se le asigna una imagen por defecto
users.get("/no_profile_pic", function (request, response) {
    response.sendFile(path.join(__dirname, "../profile_imgs", "no_pic.png"));
});

//  Login de usuario
users.get("/login", middlewareLogged, function(request, response){
    response.status(200);
    response.render("login", {errorMsg: null});
});

users.get("/cambiaMulti", function(request, response){
    response.status(200);
    response.render("cambiaMulti", {errorMsg: null});
});
users.post("/cambiaMulti", function(request, response){
    let image = request.body.userAvatar+".png";
    let user = request.session;
    daoUsers.updateMulti(MongoClient, config.url, config.name, image, user.currentUserNickname, function (error, id) {
        if (error) {
            response.status(500);
            response.render("cambiaMulti", { errorMsg: `${error.message}` });
        } else {
            
            response.status(200);
            request.session.currentUserImg2 = image;
            
            daoUsers.getUser(MongoClient, config.url, config.name, request.session.currentUserId, function(error, user){
                if(error){
                    response.status(500);
                }else{
                    response.status(200);
                    request.session.currentUserImg = user.Image;
                    response.render("sesion", {user: user});
                }
            });
        }
    });
});

users.post("/login", function(request, response){
    request.checkBody("nickname_user", "El nickname del usuario está vacío").notEmpty();
    request.checkBody("password_user", "La constraseña del usuario está vacía").notEmpty();

    request.getValidationResult().then(function (result) {
        // El método isEmpty() devuelve true si las comprobaciones
        // no han detectado ningún error
        if (result.isEmpty()) {
            let user = {};

            user.nickname = request.body.nickname_user;
            user.password = request.body.password_user;
            user.image = null;

            daoUsers.isUserCorrect(MongoClient, config.url, config.name, user.nickname, user.password, function(err, result){
                if(err){
                    response.status(500);
                    response.render("login", { errorMsg: `${error.message}` });
                }if(result === undefined){
                    response.status(200);score
                    response.render("login", { errorMsg: "El nickname o la contraseña no son correctos. Por favor, inténtelo de nuevo." });
                }else{
                    response.status(200);
                    console.log(result._id)
                    user.id = result._id;
                    user.image = result.Image;

                    request.session.currentUserId = user.id;
                    request.session.currentUserNickname = user.nickname;
                    request.session.currentUserImg = user.image;
                    
                    response.redirect("/users/sesion");
                }
            });            
        } else {
            response.status(200);
            //Se meten todos los mensajes de error en un array
            let mensaje = result.array().map(n => " " + n.msg);
            response.render("login", { errorMsg: mensaje });
        }
    });
});

// Logout de usuario
users.get("/logout", middlewareLogin, function (request, response) {
    response.status(200);
    request.session.destroy();
    response.redirect("/");
});

module.exports = users;