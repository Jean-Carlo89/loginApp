import express from "express"
import cors from "cors"

//databse
import {connectToMongoDb,connectionexport as connection} from "./database"

//helpers
import * as dbHelpers from "./helpers/helpers"

const app = express()
// const port = process.env.PORT || 3000

const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.get("/", async (req,res)=>{

    

const database = connection



//const myarray  = await database.db().listCollections().toArray()

const x = await database.db("users").collection("usersInfo").findOne()

console.log(x)

   res.send(x)
})



app.get("/test",(req,res)=>{
    res.send("test route")
})



app.post('/loginAttempt', async (req,res)=>{
  
    //  ->> -------> Requires email and password in the body
 
    
    if(req.body.email && req.body.password){
      
      
      const response = await dbHelpers.loginAttempt(req.body)

      switch (response) {
        case 500:
         res.status(500).send("There was an error");
          break;
        case true:
            res.status(200).send("Authenticated login");
          break;
          case false:
            res.status(403).send("incorrect email and/or password");
          break;
        default:
          res.send("an error occured").status(500)
      }

    }
    else{
        res.status(400).json({message:"Username and password required."})
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