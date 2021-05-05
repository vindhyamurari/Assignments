import {user} from '../models/userSchema'
import bcrypt from 'bcrypt'
import { response } from 'express';
import jwt from 'jsonwebtoken'
require('dotenv').config()

async function emailInUse(email:string) {
    try{
        const userWithEmail=await user.findOne({email})
        if(userWithEmail)
            return userWithEmail;
        return true;
    }
    catch(err){
        console.log('Error in emailInUse',err.message)
        response.send(err.message)
    }
}

// Method : POST to register a new user
async function registerUser(request:any,response:any) {
    try{
        let {name,email,password}=request.body
        if(await emailInUse(email)===true){
            await bcrypt.hash(password,10,async (err,hash)=>{
                if(err){
                    console.log('Error in Hashing the Password',err.message)
                    return false
                }
                password=hash
                let newUser=new user()
                newUser={name,email,password}
                newUser=await user.create(newUser)
                response.status(201).send(newUser);
            })
        }
        else{
            response.status(409).send({
                success:false,
                message:'This email-id is already in use'
            })
        }
    }
    catch(err){
        console.log('Error in Register User',err.message)
        response.status(409).send({
            success:false,
            message:'Error in Register User'
        })
    }
}

async function loginUser(request:any,response:any){
    try{
        let {email,password}=request.body
        let userEmail=await emailInUse(email)
        if(userEmail!==true){
            let match=await bcrypt.compare(password,userEmail.password)
            if(match){
                const token=jwt.sign({ userId: userEmail._id }, `${process.env.jwt_key}`, { expiresIn: '1d' })
                return response.json({success:true,message:'Login Succesfull',token});
            }
            else{
                return response.status(401).json({success:false,message:'Incorrect Password'});
            }
        }
        else{
            return response.end(JSON.stringify({success:false,message:'User not Found Please Register'}));
        }
    }
    catch(err){
        console.log('Error in Login User',err)
    }
}

async function isAuthorized(request:any,response:any,next:Function){
    try
     {
        if(request.headers && request.headers.authorization){
            const token=request.headers.authorization
            const decode:any=jwt.verify(token,`${process.env.jwt_key}`)
            const requestedUser=await user.findById(decode.userId)
            try {
                if(!requestedUser){
                    return response.status(401).json({success:false,message:'Unauthorized Access'})
                }
                request.user=requestedUser
                next()
            } catch (error) {
                if(error.name==='JsonWebTokenError'){
                    return response.status(401).json({success:false,message:'Unauthorized Access'})
                }
                if(error.name==='TokenExpiredError'){
                    return response.status(403).json({success:false,message:'Session Expired Please Try Sign in Again'})
                }
                response.json({success:false,message:'Couldnt Sign In Try Again'})
            }

        }
    } catch (error) {
        console.log('Error in Authorization ',error.message)
        return response.json({success:false,message:'Unauthorized Access'})
    }
}

export {registerUser,loginUser,isAuthorized}