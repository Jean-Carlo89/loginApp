//const bcrypt = require('bcrypt')
import bcrypt from "bcrypt"

export const encryptPassword = (password)=>{

  return bcrypt.hashSync(password,12)

}

export const compareHash = (password:string , hash:string) =>{
  return bcrypt.compareSync(password,hash)
}