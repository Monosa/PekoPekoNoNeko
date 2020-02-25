"use strict";

class DAOUsers{
    

    // Inserta un usuario en la base de datos
    insertUser(MongoClient, url, name, user, callback){
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            else{

                if(user.email === "" || user.name === "" || user.password === "" || user.nickname === ""){
                    callback(new Error("Se deben llenar los campos obligatorios"), null);
                }

                var dbo = db.db(name);
                dbo.collection("Users").insertOne({
                    "Name": user.name,
                    "Nickname": user.nickname,
                    "Email": user.email,
                    "Password": user.password
                }, function(err, resultado) {
               /* const sql = `INSERT INTO user (id, name, nickname, email, password, image)`
                 + `VALUES (?,?,?,?,?,?)`;
                 let elems = [user.id, user.name, user.nickname, user.email, user.password, user.image];

                 connection.query(sql, elems, function(err, resultado){
                    connection.release();*/
                    if(err){
                        throw err;
                    }else{
                        console.log(resultado);
                        callback(null, resultado.insertedId);
                        db.close();
                    }
                 });
            }
        })
    }

    // Lee un usuario de la base de datos
    getUser(MongoClient, url, name, id, callback){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            
            var o_id = new MongoClient.ObjectID(id);
            
            var dbo = db.db(name);
            dbo.collection("Users").find({"_id":o_id}).toArray(function(err, result) {
                if(err) throw err;
                /*else{
                    const sql = `SELECT * FROM user WHERE id = ?`;

                    connection.query(sql, [id], function(err, resultado){
                        connection.release();
                        if(err){
                            callback(new Error("Error de acceso a la base de datos"), null);
                        }
                else{*/
                console.log(result[0]);
                callback(null, result[0]);
                db.close();
            });
        });
    }

    //  Comprueba que no existe un usuario en la base de datos con el nickname "nickname"
    checkUser(MongoClient, url, name, nickname, callback){
        /*this.pool.getConnection(function(err, connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"), null);
            }else{
                const sql = `SELECT * FROM user WHERE nickname = ?`;

                connection.query(sql, [nickname], function(err, resultado){
                    connection.release();
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"), null);
                    }else{*/
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(name);
            dbo.collection("Users").find({"Nickname":nickname}).toArray(function(err, result) {
                if(err) throw err;
                callback(null, result);
                db.close();
            });
        });
    }

    //  Obtiene el nombre del fichero de la imagen del usuario con id = "id"
    getUserImage(id, callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"), null);
            } else {
                let sql = `SELECT image FROM user WHERE id = ?`;

                connection.query(sql, [id], function (err, result) {
                    connection.release();
                    if (err) {
                        callback(err, null);
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

    //  Comprueba que el nickname y la contraseña introducidos son correctos
    isUserCorrect(MongoClient, url, name, nickname, password, callback){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(name);
            dbo.collection("Users").find({$and: [{"Nickname":nickname},{"Password":password}]}).toArray(function(err, result) {
                if(err) throw err;
                callback(null, result[0]);
                db.close();
            });
        });
        /*this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"), null);
            } else {
                let sql = `SELECT * FROM user WHERE nickname = ? AND password = ?`;

                connection.query(sql, [nickname, password], function (err, result) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"), null);
                    } else {
                        callback(null, result[0]);
                    }
                });
            }
        });*/
    }
}

module.exports = DAOUsers;