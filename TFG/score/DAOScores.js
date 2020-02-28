class DAOScores{
   insertScore(MongoClient, url, name, datos, callback){
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            else{

                var dbo = db.db(name);
                dbo.collection("Scores").insertOne({
                    "UserId":  new MongoClient.ObjectID(datos[3]),
                    "IdCancion": parseInt(datos[0]),
                    "IdDificultad": parseInt(datos[1]),
                    "Puntos": parseInt(datos[2])
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
        });
    }
}
module.exports = DAOScores;