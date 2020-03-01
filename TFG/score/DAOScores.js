class DAOScores{
   insertScore(MongoClient, url, name, datos, callback){
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            else{
                var dbo = db.db(name);
                var oid = new MongoClient.ObjectID(datos[3]);
                dbo.collection("Scores").find({$and: [{'IdCancion':parseInt(datos[0])},{'IdDificultad':parseInt(datos[1])},{'UserId':oid}]}).toArray(function(err,result){
                    if (err) throw err;
                    else{
                        console.log("La consulta devuelve ", result.length);
                        if(result.length > 0){
                            //Si los nuevos puntos son mayores que la puntuacion anterior actualizamos
                            
                            if(result[0].Puntos < datos[2]){

                                dbo.collection("Scores").updateOne({'IdCancion':parseInt(datos[0]),'IdDificultad':parseInt(datos[1]),'UserId':oid},{$set:{'Puntos':parseInt(datos[2])}}, function(err, result2){
                                    callback(null, result[0]._id);
                                    db.close();
                                });
                                
                            }
                        }
                        else{
                            dbo.collection("Scores").insertOne({
                                "UserId":  oid,
                                "IdCancion": parseInt(datos[0]),
                                "IdDificultad": parseInt(datos[1]),
                                "Puntos": parseInt(datos[2])
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
                    }
                });
            }
        });
    }
    
}
module.exports = DAOScores;