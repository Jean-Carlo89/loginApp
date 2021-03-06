import {connectionexport as connection}  from "../database"
import * as encryptionHelper from "./encryption"

import {Request} from "express"

// import {SessionData} from "express-session"
// import {ObjectId} from "mongodb"

// interface User extends SessionData{
//     user : ObjectId
// }


//login attempt
export const loginAttempt = async(data:data,req:Request)=>{
    const users = connection.db("users").collection("usersInfo")
    try{
        const user = await users.findOne({email:data.email});
       
        console.log(user)
        
        if(user && encryptionHelper.compareHash(data.password, user.hash)){
            
            //generate token for session
           req.session.user = user._id
            console.log(req.session)
           //req.session.save()  //gets autommatically called  when session is modified, does not need to be called in most times
            return true
        }else{
           
            return false
        }

        
    }catch(e){
        console.log(e)
        return 500
    }
    
}



export const registerNewUser = async(data:data)=>{
    const users = connection.db("users").collection("usersInfo")
    const hashPassword = encryptionHelper.encryptPassword(data.password)
  
    
    try{
        await users.insertOne({username:data.username, email: data.email, hash: hashPassword});
        return true
    }catch(e){
        console.log(e)
        return false
    }
}

const checkIfUserExist = async(data:string)=>{
    const users = connection.db("users").collection("usersInfo")
    try{
        return  await users.findOne({email: data});
        
    }catch(e){
        console.log(e)
        
    }
}


interface data{
    username : string,
    email: string,
    password: string
}