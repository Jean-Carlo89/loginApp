import express from "express"
import cors from "cors"

import  session from "express-session"
import MongoStore from 'connect-mongo'


import { v4 as uuid } from 'uuid';
//databse
import {connectToMongoDb,connectionexport as connection} from "./database"

//helpers
import * as dbHelpers from "./helpers/helpers"

import {ObjectId} from "mongodb"

const app = express()
// const port = process.env.PORT || 3000

const port = 3000


// const sessionStore = new MongoStore({
  
//   client : connection,
//   collectionName : "sessions"
// })

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(session({
  name: "j-mongo-test",
  genid: ()=>{
    const token = uuid();
    //console.log(token)
    return token
  },
  secret:" secretTest", //change for env later,
  resave:false,
  saveUninitialized:false,
  store: MongoStore.create({
    mongoUrl:"mongodb://root:root@db:27017/",
    ttl:1000*30,
    autoRemove:"native",
    dbName:"users",
    collectionName: "sessions"
  }),
  cookie:{
    maxAge: 1000 * 1000,

  }
}))


app.get("/", async (req,res)=>{

const database = connection
//const myarray  = await database.db().listCollections().toArray()
const x = await database.db("users").collection("usersInfo").findOne()
//console.log(x)
   res.send(x)

  
})

app.get("/logReq", async(req,res)=>{

  if(!req.session || !req.session.user){
    res.send("you do not have access")
    return
  }
  
  const user = req.session.user
  const database = connection

  const id = new ObjectId(user)

  console.log(id)
  
  const registeredUser  = await database.db("users").collection("usersInfo").findOne({_id:id})  

  if(registeredUser){
    res.send(registeredUser.email)
    return
  }else{
    res.send("You do not have access, login again").status(401)
    return
  }


})  



app.get("/test",(req,res)=>{
    res.send("test route")
})



app.post('/loginAttempt', async (req,res)=>{
  
    //  ->> -------> Requires email and password in the body
 
    
    if(req.body.email && req.body.password){
      console.log(req.session)
      
      const response = await dbHelpers.loginAttempt(req.body,req)

      switch (response) {
        case 500:
         res.status(500).send("There was an error");
          break;
        case true:
         
        // req.session.user= {
        //     uuid: '12234-2345-2323423'
        // } //THIS SETS AN OBJECT - 'USER'
        
        // req.session.save(err => {
        //     if(err){
        //         console.log(err);
        //     } else {
        //         res.send(req.session // YOU WILL GET THE UUID IN A JSON FORMAT
        //     }
        // }); //THIS SAVES THE SESSION.
            res.status(200).send("Authenticated login");
          break;
          case false:
            res.status(401).send("incorrect email and/or password");
          break;
        default:
          res.send("an error occured").status(500)
      }

    }
    else{
        res.status(400).json({message:"email and password required."})
    }

})


app.post('/signUp', async (req,res)=>{
  
  //  ->> -------> Requires email , username password in the body
  
  if(req.body.username && req.body.password && req.body.email){
      
      
    const response = await dbHelpers.registerNewUser(req.body)

    switch (response) {
      case true:
       res.status(200).send("SignUp succesful");
        break;
      case false:
          res.status(500).send("Error during signup");
        break;
      default:
        res.send("an error occured").status(500)
    }

  }
  else{
      res.status(400).json({message:"Username and password required."})
  }
  
  })
  











const server = app.listen(port,async()=>{
    console.log(port)
    await connectToMongoDb()
    
    process.on('SIGINT',()=>{
         server.close()
        console.log("Server closed")
    })
    console.log(`Listening on ${port}`)
})


export {app}
