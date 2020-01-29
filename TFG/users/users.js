"user strict";

const express = require("express");
const path = require("path");
const mysql = require("mysql");
const multer = require("multer");
const config = require("../config.js");
const DAOUsers = require("./DAOUsers.js");

const users = express.Router(); // Crea la aplicación 'users' con sus propias rutas (empezando por /users)

const pool = mysql.createPool(config.mysqlConfig);
const daoUsers = new DAOUsers(pool);

const multerFactory = multer({ storage: multer.memoryStorage() });

// Registro de usuario
users.get("/signup", function(request, response){
    response.status(200);
    response.render("signup", {errorMsg: null});
});

users.post("/signup", multerFactory.single("user_img"), function (request, response) {
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
            user.image = null;

            if (request.file) {
                user.image = request.file.buffer;
            }

            daoUsers.insertUser(user, function (error, id) {
                if (error) {
                    response.status(500);
                    response.render("signup", { errorMsg: `${error.message}` });
                } else {
                    user.id = id;
                    response.status(200);
                    request.session.currentUserNickname = user.nickname;
                    request.session.currentUserId = user.id;
                    if(user.image !== null)
                        request.session.currentUserImg = true;
                    else
                        request.session.currentUserImg = false;
                    response.redirect("/users/sesion");
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


// Perfil de usuario
users.get("/sesion", function(request, response){
    daoUsers.getUser(request.session.currentUserId, function(error, user){
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

module.exports = users;