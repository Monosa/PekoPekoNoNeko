"use strict";

class DAOUsers{
    constructor(pool){
        this.pool = pool;
    }

    // Inserta un usuario en la base de datos
    insertUser(user, callback){
        this.pool.getConnection(function(err, connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"), null);
            }else{

                if(user.email === "" || user.name === "" || user.password === "" || user.nickname === ""){
                    callback(new Error("Se deben llenar los campos obligatorios"), null);
                }

                const sql = `INSERT INTO user (id, name, nickname, email, password, image)`
                 + `VALUES (?,?,?,?,?,?)`;
                 let elems = [user.id, user.name, user.nickname, user.email, user.password, user.image];

                 connection.query(sql, elems, function(err, resultado){
                    connection.release();
                    if(err){
                        callback(new Error("Error en el proceso de registro"), null);
                    }else{
                        callback(null, resultado.insertId);
                    }
                 });
            }
        })
    }

    // Lee un usuario de la base de datos
    getUser(id, callback){
        this.pool.getConnection(function(err, connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"), null);
            }else{
                const sql = `SELECT * FROM user WHERE id = ?`;

                connection.query(sql, [id], function(err, resultado){
                    connection.release();
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"), null);
                    }else{
                        callback(null, resultado[0]);
                    }
                });
            }
        });
    }

    /*Obtiene el nombre del fichero de la imagen del usuario con id = "id"*/
    getUserImage(id, callback){
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            } else {
                let sql = `SELECT image FROM user WHERE id = ?`;
                connection.query(sql, [id], function (err, result) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        if (result.length === 0) {
                            callback("No existe");
                        } else {
                            callback(null, result[0].image);
                        }
                    }
                });
            }
        });
    }
}

module.exports = DAOUsers;