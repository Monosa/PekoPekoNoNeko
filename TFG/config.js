/*module.exports = {
   mysqlConfig: {
           host: "localhost",     // Ordenador que ejecuta el SGBD
           user: "root",          // Usuario que accede a la BD
           password: "",          // Contraseña con la que se accede a la BD
           database: "PekoPekoNoNeko"     // Nombre de la base de datos
   },
     port: 3000                   // Puerto en el que escucha el servidor
}*/
const MongoClient=require('mongodb');
const url="mongodb://localhost:27017/PekoPekoNoNeko";

MongoClient.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true },function(err){
    if(err){
        console.log('Error in connection');
    }
    else{
        console.log('Connected!');
    }
});
module.exports=MongoClient;