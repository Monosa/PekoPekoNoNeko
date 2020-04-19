class DAOScores{

   insertScore(MongoClient, url, name, datos, callback){
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            else{
                var dbo = db.db(name);
                var oid = new MongoClient.ObjectID(datos.user);
                dbo.collection("Scores").find({$and: [{'IdCancion':new MongoClient.ObjectID(datos.songid)},{'IdDificultad':parseInt(datos.difid)},{'UserId':oid}]}).toArray(function(err,result){
                    if (err) throw err;
                    else{
                        if(result.length > 0){
                            //Si los nuevos puntos son mayores que la puntuacion anterior actualizamos
                            
                            if(result[0].Puntos < datos.puntos){
                                dbo.collection("Scores").updateOne({'IdCancion':new MongoClient.ObjectID(datos.songid),'IdDificultad':parseInt(datos.difid),'UserId':oid},{$set:{'Puntos':parseInt(datos.puntos)}}, function(err, result2){
                                    callback(null, result[0]._id);
                                    db.close();
                                });
                            }
                            else {
                                callback(null, result[0]._id);
                                db.close();
                            }
                        }
                        else{
                            dbo.collection("Scores").insertOne({
                                
                                "UserId":  oid,
                                "Nick": datos.nick,
                                "IdCancion": new MongoClient.ObjectID(datos.songid),
                                "IdDificultad": parseInt(datos.difid),
                                "Puntos": parseInt(datos.puntos)
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

    getSongScores(MongoClient, url, name, songid, callback){
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            else{
                var dbo = db.db(name);
                dbo.collection("Scores").find({'IdCancion':new MongoClient.ObjectID(songid)}).toArray(function(err,result){
                    if(err) throw err;
                    else{
                        callback(null, result);
                        db.close();
                    }
                });
            }
        });
    }

    getAllScores(MongoClient, url, name, callback){
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            else{
                var dbo = db.db(name);
                dbo.collection("Scores").find({}).sort({ 'Puntos': -1 }).toArray(function(err, scores){
                    if(err) throw err;
                    else{
                        callback(null, scores);
                        db.close();
                    }
                });
            }
        });
    }
    
    getUserSongScores(MongoClient, url, name, songid, nick, callback){
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            else{
                var dbo = db.db(name);
                dbo.collection("Scores").find({$and: [{'IdCancion': new MongoClient.ObjectID(songid)}, {'Nick': nick}]}).sort({ 'Puntos': -1 }).toArray(function(err,result){
                    if(err) throw err;
                    else{
                        callback(null, result);
                        db.close();
                    }
                });
            }
        });
    }
}
module.exports = DAOScores;