class DAOCanciones{
    //constructor(pool) {
        //this.pool = pool;
    //}
    
    getListaCanciones(MongoClient, url, name, callback) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(name);
            dbo.collection("Songs").find({}).toArray(function(err, result) {
                if (err) throw err;
                callback(null, result);
                db.close();
            });
        });
    }
    /*getListaCanciones(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err)
                callback(new Error("Error de conexión a la base de datos"), null);
            else {
                const sql = `SELECT id, nombre, autor, image
                FROM songs`;

                connection.query(sql, function (err, listado) {
                    if (err)
						callback(new Error("Error de acceso a la base de datos en el getListaCanciones"), null);
                    else {
                        console.log("Respuestas leídas correctamentes");
						callback(null, listado);
                    }
                })       
            }
        })
    }*/
	getCancion(MongoClient, url, name, id,iddif, multi, callback){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(name);
            dbo.collection("Songs").find({"_id":new MongoClient.ObjectId(id)}).toArray(function(err, result) {
                if (err) throw err;
                console.log(new MongoClient.ObjectId(result[0]['_id']), iddif, multi);
                dbo.collection("Secuencias").find({$and: [{'Songparent':new MongoClient.ObjectId(result[0]['_id'])},{'Secid':parseInt(iddif)},{'Multi':multi}]}).toArray(function(err,result2){
                    if (err) throw err;
                    console.log(result[0], result2[0]);
                    var devolver = [result[0],result2[0]];
                    callback(null, devolver);
                });
            });
        });
	}
    actualizaCancion(id, callback) {} //No tengo claro por que habria que actualizar alguna cancion
	insertSong(MongoClient, url, name, datos, callback){
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            else{
                var dbo = db.db(name);
                dbo.collection("Songs").find({$and: [{'Nombre':datos.songname},{'Autor':datos.authorname}]}).toArray(function(err,result){
                    if (err) throw err;
                    else{
                        if(result.length > 0){
                            //Si existe esa combinacion ya existe la cancion
                            callback(null, result[0]);
                            db.close();
                        }
                        
                        else{
                            dbo.collection("Songs").insertOne({
                                "Nombre":  datos.songname,
                                "Autor": datos.authorname,
                                "Imagen": datos.image,
                                "Cancion": datos.audio
                            }, function(err, resultado) {
                                if(err){
                                    throw err;
                                }else{
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

    insertSecuencia(MongoClient, url, name, datos, callback){
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            else{
                var dbo = db.db(name);
                dbo.collection("Secuencias").find({'Songparent':datos.songparent}).toArray(function(err, result){
                    if (err) throw err;
                    else{
                        // Si hay un solo resultado implica que le falta el multi, por lo que le dejamos insertar el multi 
                        // No es que le dejemos al usuario. Le dejamos al sistema
                        if(result.length === 1){
                            dbo.collection("Secuencias").insertOne({
                                "Songparent":  new MongoClient.ObjectID(datos.songparent),
                                "Secid": 3,
                                "Multi": datos.multi,
                                "value": datos.value
                            }, function(err, resultado) {
                                if(err){
                                    throw err;
                                }else{
                                    console.log(resultado);
                                    console.log("DEVOLVEMOS:" + resultado.ops[0]);
                                    //Tenemos que devolver SongId
                                    callback(null, resultado.ops[0]); // Devuelve la canción entera, con todos sus atributos
                                    db.close();
                                }
                            });
                        }
                        // Implica que no hay aun registro para esa cancion, por lo que la insertamos                        
                        else if (result.length === 0){
                            dbo.collection("Secuencias").insertOne({
                                "Songparent":  new MongoClient.ObjectID(datos.songparent),
                                "Secid": 3,
                                "Multi": datos.multi,
                                "Value": datos.value
                            }, function(err, resultado) {
                                if(err){
                                    throw err;
                                }else{
                                    console.log(resultado);
                                    console.log("DEVOLVEMOS:" + resultado.ops[0]);
                                    //Tenemos que devolver SongId
                                    callback(null, resultado.ops[0]); // Devuelve la canción entera, con todos sus atributos
                                    db.close();
                                }
                            });
                        }
                        else {                            
                            callback(new Error("Esa canción ya cuenta con un secuencia en modo individual y en modo multijugador"), null);
                            db.close();
                        }
                    }
                });
            }
        });
    }


}


module.exports = DAOCanciones;