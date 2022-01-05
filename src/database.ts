import {MongoClient,Db} from "mongodb"
import {app} from "./app"

let connectionexport : MongoClient;

 const connectToMongoDb = async ()=>{
    const client = new MongoClient("mongodb://root:root@db:27017/")
    

    try{
       const connection = await client.connect()
       //const x = connection.db("users")
      // app.locals.bd = x
       console.log(`connected to db ${connection.db("users").databaseName}`)
        
       connectionexport = connection
       process.on("SIGINT",async()=>{
           try{
            await connection.close()
            console.log("connection to db closed")
           }catch(e){
                console.log(e)
           } 
           
       })
    }catch(e){
        console.log(e)
    }

}

export {connectionexport, connectToMongoDb}

