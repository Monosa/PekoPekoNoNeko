class DAOCanciones {

    getListaCanciones(MongoClient, url, name, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(name);
            dbo.collection("Songs").find({}).toArray(function (err, result) {
                if (err) throw err;
                callback(null, result);
                db.close();
            });
        });
    }

    getCancion(MongoClient, url, name, id, iddif, multi, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(name);
            dbo.collection("Songs").find({ "_id": new MongoClient.ObjectId(id) }).toArray(function (err, result) {
                if (err) throw err;
                console.log("ID CANCION: " + new MongoClient.ObjectId(result[0]['_id']), " ID DIFICULTAD: " + iddif, " MULTI: " + multi);
                dbo.collection("Secuencias").find({ $and: [{ 'Songparent': new MongoClient.ObjectId(result[0]['_id']) }, { 'Secid': parseInt(iddif) }, { 'Multi': multi }] }).toArray(function (err, result2) {
                    if (err) throw err;
                    console.log("RESULTADO DE FIND EN SECUENCIAS: " + result2[0]['Multi']);
                    var devolver = [result[0], result2[0]];
                    callback(null, devolver);
                });
            });
        });
    }

    actualizaCancion(id, callback) { } //No tengo claro por que habria que actualizar alguna cancion

    insertSong(MongoClient, url, name, datos, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            else {
                var dbo = db.db(name);
                dbo.collection("Songs").find({ $and: [{ 'Nombre': datos.songname }, { 'Autor': datos.authorname }] }).toArray(function (err, result) {
                    if (err) throw err;
                    else {
                        if (result.length > 0) {
                            //Si existe esa combinacion ya existe la cancion
                            callback(null, result[0]);
                            db.close();
                        }

                        else {
                            dbo.collection("Songs").insertOne({
                                "Nombre": datos.songname,
                                "Autor": datos.authorname,
                                "Imagen": datos.image,
                                "Cancion": datos.audio
                            }, function (err, resultado) {
                                if (err) {
                                    throw err;
                                } else {
                                    console.log(resultado);
                                    console.log("DEVOLVEMOS:" + resultado.ops[0]);
                                    //Tenemos que devolver SongId
                                    callback(null, resultado.ops[0]); // Devuelve la canción entera, con todos sus atributos
                                    db.close();
                                }
                            });
                        }
                    }
                });
            }
        });
    }

    insertSecuencias(MongoClient, url, name, conjuntoDatos, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            else {
                var dbo = db.db(name);
                dbo.collection("Secuencias").find({ 'Songparent': conjuntoDatos[0].songparent }).toArray(function (err, result) {
                    if (err) throw err;
                    else {
                        // Implica que no hay aun registro para esa cancion, por lo que insertamos todas sus secuencias                       
                        if (result.length === 0) {
                            conjuntoDatos.forEach(function (value, i) {
                                console.log(i);
                                dbo.collection("Secuencias").insertOne({
                                    "Songparent": new MongoClient.ObjectID(value.songparent),
                                    "Secid": value.secid,
                                    "Multi": value.multi,
                                    "Value": value.value
                                }, function (err) {
                                    if (err)
                                        throw err;
                                });
                            });
                            callback(null); // Devuelve la canción entera, con todos sus atributos
                            db.close();
                        }
                        else {
                            callback(new Error("Esa canción ya cuenta con secuencias"), null);
                            db.close();
                        }
                    }
                });
            }
        });
    }
}


module.exports = DAOCanciones;