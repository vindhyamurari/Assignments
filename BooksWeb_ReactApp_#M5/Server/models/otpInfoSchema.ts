import mongoose from 'mongoose'

const otpInfoSchema=new mongoose.Schema({
    phone:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    }
})

const otpInfo=mongoose.model('otpInfos',otpInfoSchema)
export {otpInfo}