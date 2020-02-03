class DAOSelectionScreen{
    constructor(pool) {
        this.pool = pool;
    }

    getListaCanciones(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err)
                callback(new Error("Error de conexión a la base de datos"), null);
            else {
                const sql = `SELECT id, nombre, autor
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
    }
	getCancion(id, callback){
		this.pool.getConnection(function (err, connection) {
            if (err)
            callback(new Error("Error de conexión a la base de datos"), null);
            else {
                const sql = `SELECT son.nombre, son.autor, GROUP_CONCAT(sec.value)
                FROM songs son, secuencias sec
				WHERE son.id = ? AND sec.parent = ?`;
				const elems = [id, id];
                connection.query(sql, elems, function (err, listado) {
                    if (err)
						callback(new Error("Error de acceso a la base de datos en el getListaCanciones"), null);
                    else {
                        console.log("Respuestas leídas correctamentes");
						callback(null, listado);
                    }
                })       
            }
        })
	}
    actualizaCancion(id, callback) {} //No tengo claro por que habria que actualizar alguna cancion
	setCancion(){}


}   


module.exports = DAOSelectionScreen;