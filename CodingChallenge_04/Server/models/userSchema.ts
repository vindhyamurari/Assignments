import mongoose from 'mongoose'
 
const usersSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
    },
    phone:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    bookmarks:{
        type:[String],
        default:[]
    }
})

const users=mongoose.model('users',usersSchema)
export{users}