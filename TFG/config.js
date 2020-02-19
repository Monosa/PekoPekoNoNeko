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