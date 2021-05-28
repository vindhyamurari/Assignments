import mongoose from 'mongoose'
 
const usersSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const users=mongoose.model('users',usersSchema)
export{users}