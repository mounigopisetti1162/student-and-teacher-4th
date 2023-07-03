import * as dotenv from 'dotenv'
import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import dataRouter from './routes/data.routes.js'

export const app=express()
dotenv.config()
const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL
const client =new MongoClient(MONGO_URL)
await client.connect()
console.log("mongo db")

app.use(express.json())
app.use(cors());
app.get('/',function(request,responce)
{
    responce.send("this is an student and teacher server ")
})

app.use('/user',userRouter)
app.use('/data',dataRouter)


app.listen(PORT,()=>console.log(`the server is connected to server ${PORT}`))
export {client}


