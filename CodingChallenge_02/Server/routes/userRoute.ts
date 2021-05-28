 import express, { request } from 'express'
import {registerUser,loginUser} from "../controllers/userController"

let userRouter=express.Router()

userRouter.post('/register',(request,response)=>{
    registerUser(request,response);
})

userRouter.post('/login',(request,response)=>{
    loginUser(request,response);
})


export{userRouter} 