class DAOSelectionScreen{
    //constructor(pool) {
        //this.pool = pool;
    //}
    
    getListaCanciones(MongoClient, url, callback) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("PekoPekoNoNeko");
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
	getCancion(MongoClient, url,id,iddif, callback){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("PekoPekoNoNeko");
            dbo.collection("Songs").find({"Songid":parseInt(id)}).toArray(function(err, result) {
                if (err) throw err;
               
                dbo.collection("Secuencias").find({$and: [{'Songparent':result[0]['Songid']},{'Secid':parseInt(iddif)}]}).toArray(function(err,result2){
                    if (err) throw err;
                    var devolver = [result[0],result2[0]];
                    callback(null, devolver);
                });
            });
        });
		/*this.pool.getConnection(function (err, connection) {
            if (err)
            callback(new Error("Error de conexión a la base de datos"), null);
            else {
                const sql = `SELECT son.nombre, son.autor, son.image, GROUP_CONCAT(sec.value) as tiempos
                FROM songs son, secuencias sec
				WHERE son.id = ? AND sec.parent = ?`;
				const elems = [id, id];
                connection.query(sql, elems, function (err, listado) {
                    if (err)
						callback(new Error("Error de acceso a la base de datos en el getListaCanciones"), null);
                    else {
                        console.log("Respuestas leídas correctamentes");
						callback(null, listado[0]);
                    }
                })       
            }
        })*/
	}
    actualizaCancion(id, callback) {} //No tengo claro por que habria que actualizar alguna cancion
	setCancion(){}


}


module.exports = DAOSelectionScreen;