const {MongoClient} = require('mongodb');
require('dotenv').config()

const url = process.env.url;
const dbName = "User"
const client = new MongoClient(url,{useUnifiedTopology:true})


async function connect(){
    try{
        await client.connect();
        console.log("Connected to the Mongo DB");
        return client.db(dbName)
    }catch(err){
        throw new Error("Could not connect to Database")
    }
}

module.exports = connect;