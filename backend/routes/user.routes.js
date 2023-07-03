import express from 'express'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken';
import * as dotenv from "dotenv"
// import { getuser, } from '../services/user.services.js';
import {getuser,getalluser, postuser} from '../services/user.services.js'

const router1=express.Router()
async function generatepassword(password)
{
const no_of_rounds=10
const salt=await bcrypt.genSalt(no_of_rounds)
const genpass=await bcrypt.hash(password,salt)
return genpass
}




router1.post('/signup', async function (request, responce) {
  const {username,password,roleId
  } = request.body;
//   const usernamefound=await getuser(username)
const usernamefound=await getuser(username)
  // responce.send(usernamefound)
  // console.log(usernamefound.username)
  // const user=usernamefound.username
  //not neede like this beacuse if data is not present thrn it will return null which cant be read
  if(usernamefound)
  {
    responce.send({message:'username alredy exists'})
  }
  else{
    const gen=await generatepassword(password)
    const newuser=await postuser({username:username,password:gen})
    responce.send(newuser)
console.log(gen)
  }

//   const user = await getuser();
//   responce.send(user);
});
//this is the sigup processin which the password is hashed




router1.get('/signup',async function(request,responce)
{
  const user_values=await getalluser()
  console.log(user_values)
  responce.send(user_values)
})

router1.post('/login', async function (request, responce) {
  const {username,password,roleId} = request.body;
  const usernamefound=await getuser(username)
  console.log(usernamefound)

  if(!usernamefound)
  {
responce.send({message:'username not found'})
  }
  else{
const pass=await bcrypt.compare(password,usernamefound.password)
if(pass)
{
  const roleId=usernamefound.roleId
  console.log(roleId)
  const token=jwt.sign({id:usernamefound._id},process.env.SCRETE_TOKEN)
  responce.status(200).send({message:"logged in sucessfully",token:token,roleId:roleId})
}
else{
  responce.send({message:'invalid credentials'})
}
console.log(password)
console.log(pass)
  }

});
//this is the login process in which password is checked and token is passed


export default router1;
