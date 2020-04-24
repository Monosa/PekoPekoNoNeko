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
                    "Password": user.password,
                    "Image": user.image,
                    "ImageMulti": user.image
                }, function(err, resultado) {
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
                console.log(result[0]);
                callback(null, result[0]);
                db.close();
            });
        });
    }

    //  Comprueba que no existe un usuario en la base de datos con el nickname "nickname"
    checkUser(MongoClient, url, name, nickname, callback){
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
    }

    updateMulti(MongoClient, url, name, image, nickname, callback){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(name);
            dbo.collection("Users").updateOne({"Nickname":nickname},{$set:{'ImageMulti':image}}, function(err, result){
                callback(null, result);
                db.close();
            });
        });
    }

    updateUser(MongoClient, url, name, user, callback){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(name);
            dbo.collection("Users").updateOne({"Nickname": user.nickname}, 
                                              {$set:{'Email': user.email,
                                                     'Password': user.password,
                                                     'Name': user.name,
                                                     'Image': user.image}}, function(err, result){
                callback(null, result);
                db.close();
            });
        });
    }
    
}

module.exports = DAOUsers;