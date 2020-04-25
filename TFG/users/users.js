const express = require("express");
const MongoClient = require('mongodb');
const config = require("../config.js");
const DAOUsers = require("./DAOUsers.js");

const users = express.Router(); // Crea la aplicación 'users' con sus propias rutas (empezando por /users)

//const pool = mysql.createPool(config.mysqlConfig);
const daoUsers = new DAOUsers();

// Middleware que limita el acceso a la sesión sin estar loggeado
function middlewareLogin(request, response, next) {
    if (request.session.currentUserNickname !== undefined) {
        next();
    } else {
        response.redirect("/users/login");
    }
}

function middlewareLogged(request, response, next) {
    if (request.session.currentUserNickname !== undefined) {
        response.redirect("/users/sesion");
    } else {
        next();
    }
}

// Registro de usuario
users.get("/signup", middlewareLogged, function (request, response) {
    response.status(200);
    response.render("signup", {
        errorMsg: null
    });
});

users.post("/signup", function (request, response) {
    //  Comprobar que los campos obligatorios no estén vacíos
    request.checkBody("email_user", "El email del usuario está vacío").notEmpty();
    request.checkBody("password_user", "La contraseña está vacía").notEmpty();
    request.checkBody("name_user", "El nombre del usuario está vacío").notEmpty();
    request.checkBody("nickname_user", "El nickname del usuario está vacío").notEmpty();
    //  Comprobar que la contraseña tenga un mínimo y un máximo de longitud
    request.checkBody("password_user", "La contraseña no es válida").isLength({
        min: 4,
        max: 20
    });
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
            user.image = request.body.userAvatar + ".png";

            daoUsers.checkUser(MongoClient, config.url, config.name, user.nickname, function (err, usersWithNickname) {
                if (err) {
                    response.status(500);
                    response.render("signup", {
                        errorMsg: `${error.message}`
                    });
                }
                if (usersWithNickname.length !== 0) {
                    response.status(200);
                    response.render("signup", {
                        errorMsg: "Ese nickname ya está cogido. Por favor, elige otro."
                    });
                } else {
                    daoUsers.insertUser(MongoClient, config.url, config.name, user, function (error, id) {
                        if (error) {
                            response.status(500);
                            response.render("signup", {
                                errorMsg: `${error.message}`
                            });
                        } else {
                            user.id = id;
                            response.status(200);
                            request.session.currentUserId = user.id;
                            request.session.currentUserNickname = user.nickname;
                            request.session.currentUserImg = user.image;
                            request.session.currentUserImgMulti = user.image;
                            request.session.multijugador = false;
                            response.redirect("/users/sesion");
                        }
                    });
                }
            });
        } else {
            response.status(200);
            //Se meten todos los mensajes de error en un array
            let mensaje = result.array().map(n => " " + n.msg);
            response.render("signup", {
                errorMsg: mensaje
            });
        }
    });
});


// Perfil de usuario
users.get("/sesion", middlewareLogin, function (request, response) {
    daoUsers.getUser(MongoClient, config.url, config.name, request.session.currentUserId, function (error, user) {
        if (error) {
            response.status(500);
        } else {
            response.status(200);
            response.render("sesion", {
                user: user
            });
        }
    });
});

//  Login de usuario
users.get("/login", middlewareLogged, function (request, response) {
    response.status(200);
    response.render("login", {
        errorMsg: null
    });
});

users.post("/login", function (request, response) {
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

            daoUsers.isUserCorrect(MongoClient, config.url, config.name, user.nickname, user.password, function (err, result) {
                if (err) {
                    response.status(500);
                    response.render("login", {
                        errorMsg: `${error.message}`
                    });
                }
                if (result === undefined) {
                    response.status(200);
                    response.render("login", {
                        errorMsg: "El nickname o la contraseña no son correctos. Por favor, inténtelo de nuevo."
                    });
                } else {
                    response.status(200);
                    console.log(result)

                    request.session.currentUserId = result._id;
                    request.session.currentUserNickname = result.Nickname;
                    request.session.currentUserImg = result.Image;
                    request.session.currentUserImgMulti = result.ImageMulti;
                    request.session.multijugador = false;

                    response.redirect("/users/sesion");
                }
            });
        } else {
            response.status(200);
            //Se meten todos los mensajes de error en un array
            let mensaje = result.array().map(n => " " + n.msg);
            response.render("login", {
                errorMsg: mensaje
            });
        }
    });
});

// Cambio del avatar del jugador invitado
users.get("/cambiaMulti", function (request, response) {
    response.status(200);
    response.render("cambiaMulti", {
        errorMsg: null
    });
});

users.post("/cambiaMulti", function (request, response) {
    let image = request.body.userAvatar + ".png";
    daoUsers.updateMulti(MongoClient, config.url, config.name, image, request.session.currentUserNickname, function (error, id) {
        if (error) {
            response.status(500);
            response.render("cambiaMulti", {
                errorMsg: `${error.message}`
            });
        } else {
            response.status(200);
            request.session.currentUserImgMulti = image;

            daoUsers.getUser(MongoClient, config.url, config.name, request.session.currentUserId, function (error, user) {
                if (error) {
                    response.status(500);
                } else {
                    response.status(200);
                    request.session.currentUserImg = user.Image;
                    response.render("sesion", {
                        user: user
                    });
                }
            });
        }
    });
});

// Editar perfil de usuario
users.get("/editarPerfil", function (request, response) {
    daoUsers.getUser(MongoClient, config.url, config.name, request.session.currentUserId, function (error, user) {
        if (error) {
            response.status(500);
        } else {
            response.status(200);
            response.locals.user = user;
            response.render("editarPerfil", {
                user: user,
                errorMsg: null
            });
        }
    });
});

users.post("/editarPerfil", function (request, response) {
    //  Comprobar que los campos obligatorios no estén vacíos
    request.checkBody("email_user", "El email del usuario está vacío").notEmpty();
    request.checkBody("password_user", "La contraseña está vacía").notEmpty();
    request.checkBody("name_user", "El nombre del usuario está vacío").notEmpty();
    //  Comprobar que la contraseña tenga un mínimo y un máximo de longitud
    request.checkBody("password_user", "La contraseña no es válida").isLength({
        min: 4,
        max: 20
    });
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
            user.nickname = request.session.currentUserNickname;
            user.image = request.body.userAvatar + ".png";

            daoUsers.updateUser(MongoClient, config.url, config.name, user, function (error, res) {
                if (res.result.ok !== 1) {
                    response.status(500);
                    daoUsers.getUser(MongoClient, config.url, config.name, request.session.currentUserId, function (error, user) {
                        if (error) {
                            response.status(500);
                        } else {
                            response.status(200);
                            response.locals.user = user;
                            response.render("editarPerfil", {
                                user: user,
                                errorMsg: null
                            });
                        }
                    });
                } else {
                    response.status(200);
                    request.session.currentUserImg = user.image;
                    request.session.currentUserImgMulti = user.image;
                    response.redirect("/users/sesion");
                }
            });
        } else {
            response.status(200);
            //Se meten todos los mensajes de error en un array
            let mensaje = result.array().map(n => " " + n.msg);
            daoUsers.getUser(MongoClient, config.url, config.name, request.session.currentUserId, function (error, user) {
                if (error) {
                    response.status(500);
                } else {
                    response.status(200);
                    response.locals.user = user;
                    response.render("editarPerfil", {
                        user: user,
                        errorMsg: mensaje
                    });
                }
            });
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