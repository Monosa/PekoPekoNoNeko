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
	getCancion(MongoClient, url, name, id,iddif, callback){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(name);
            console.log(id);
            dbo.collection("Songs").find({"Songid":parseInt(id)}).toArray(function(err, result) {
                if (err) throw err;
                
                dbo.collection("Secuencias").find({$and: [{'Songparent':result[0]['Songid']},{'Secid':parseInt(iddif)}]}).toArray(function(err,result2){
                    if (err) throw err;
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
                dbo.collection("Songs").find({$and: [{'Nombre':datos[0]},{'Autor':datos[1]}]}).toArray(function(err,result){
                    if (err) throw err;
                    else{
                        if(result.length > 0){
                            //Si existe esa combinacion ya existe la cancion
                            
                            callback(null, result[0]._id);
                            db.close();
                        }
                        
                        else{
                            dbo.collection("Songs").insertOne({
                                "Nombre":  datos[0],
                                "Autor": datos[1],
                                "Imagen": datos[2],
                                "Cancion": datos[3]
                            }, function(err, resultado) {
                                if(err){
                                    throw err;
                                }else{
                                    console.log(resultado);
                                    //Tenemos que devolver SongId
                                    callback(null, resultado.insertedId);
                                    db.close();
                                }
                            });
                        }
                    }
                });
            }
        });
    }


}


module.exports = DAOCanciones;