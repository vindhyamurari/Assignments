import express from 'express'
import { connectionToDB } from './models/connection'
import {router} from './routers/router'

const port=5000
const hostname='127.0.0.1'
const app=express()

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
 })

app.use('/',router)

app.on('error',(error)=>{
    console.log(error);
})

app.listen(port,hostname,async ()=>{
    console.log(`server running at http://${hostname}:${port}`);
   let res= await connectionToDB()
   console.log(res)
})