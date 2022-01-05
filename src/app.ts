import express from "express"
import cors from "cors"
import {connectToMongoDb,connectionexport} from "./database"


const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.get("/", async (req,res)=>{

    

const database = connectionexport



const myarray  = await database.db().listCollections().toArray()

const x = await database.db("users").collection("usersInfo").findOne()

console.log(x)

   res.send(x)
})

app.get("/test",(req,res)=>{
    res.send("test route")
})





const server = app.listen(port,async()=>{
    await connectToMongoDb()
    //console.log(app.locals.bd())
    process.on('SIGINT',()=>{
         server.close()
        console.log("Server closed")
    })
    console.log(`Listening on ${port}`)
})


export {app}