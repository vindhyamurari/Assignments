import {user} from '../models/userSchema'
import {otpInfo} from '../models/otpInfoSchema'
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
        let {name,email,phone,password}=request.body
        if(await emailInUse(email)===true){
            await bcrypt.hash(password,10,async (err,hash)=>{
                if(err){
                    console.log('Error in Hashing the Password',err.message)
                    return false
                }
                password=hash
                let newUser=new user()
                newUser={name,email,phone,password}
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
                const token=jwt.sign({ userId: userEmail._id }, `${process.env.jwt_key}`, { expiresIn: '5d' })
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

async function userWithPhone(phone:string) {
    try{
        const userDetails=await user.findOne({phone})
        if(userDetails)
            return userDetails;
        return false;
    }
    catch(err){
        console.log('Error in user with Phone',err.message)
        response.status(404).send({success:false,message:'Something went Wrong'})
    }
}

async function generateAndSendOTP(request:any,response:any){
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    const phone=request.body.phone;
    let userDetails=await userWithPhone(phone)
    if(userDetails){
        const otp=Math.floor(100000+ Math.random()*900000);
        const ttl=10*60*1000;
        const expires=Date.now()+ttl;
        const userData=`${phone}.${expires}.${userDetails._id}`
        const message=`Welcome to Books Web App! Your OTP for login is ${otp}`
    
        client.messages.create({
         body: message,
         from: '+17179632108',
         to: phone
       })
      .then(async(message:any) => {
          let userOTPInfo={phone,otp}
           userOTPInfo= await otpInfo.create(userOTPInfo)
          response.status(201).send({success:true,message:'OTP Generated and Sent to your Phone',userData})
      })
      .catch((err:any)=>{
          response.status(404).send({success:false,message:'Could not send OTP ! Please Try Again'})
      })
    }
    else{
        response.status(404).send({success:false,message:'Please Register before Login'})
    }
}

async function recieveAndCheckOTP(request:any,response:any) {
    const otp=parseInt(request.body.otp);
    const expiry=parseInt(request.body.userData.split('.')[1])

    if(Date.now()>=expiry){
       return response.status(504).send({success:false,message:'OTP Time Out Please Try Again'})
    }
    try{
        const phone=request.body.userData.split('.')[0]
        let dbUserData=await otpInfo.findOne({phone})
        if(dbUserData.otp==otp){
            const userId=request.body.userData.split('.')[2]
            await otpInfo.findByIdAndDelete({_id:dbUserData._id})
            const token=jwt.sign({ userId }, `${process.env.jwt_key}`, { expiresIn: '1d' })
            return response.status(200).send({success:true,message:'OTP Verified',token})
        }
        else{
            await otpInfo.findByIdAndDelete({_id:dbUserData._id})
            return response.status(404).send({success:false,message:'Incorrect OTP! Please Try Again'})
        }
    }
    catch (err:any){
        return response.status(404).send({success:false,message:'Something Went Wrong Please Try Again'})
    }
    
}

export {registerUser,loginUser,isAuthorized,generateAndSendOTP,recieveAndCheckOTP}