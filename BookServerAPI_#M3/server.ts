import express from 'express'
import { connectionToDB } from './models/connection'
import {router} from './routers/router'

const port=5000
const hostname='127.0.0.1'
const app=express()

app.use(express.json())
app.use('/',router)

app.on('error',(error)=>{
    console.log(error);
})
app.listen(port,hostname,async ()=>{
    console.log(`server running at http://${hostname}:${port}`);
    await connectionToDB()
})