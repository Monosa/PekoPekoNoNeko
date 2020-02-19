const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:adminpeko@cluster0-mqicg.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true },function(err){
    if(err){
        console.log('Error in connection');
    }
    else{
        console.log('Connected!');
    }
});
module.exports=MongoClient;