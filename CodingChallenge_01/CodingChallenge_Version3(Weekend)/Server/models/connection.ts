import mongoose from 'mongoose'
require('dotenv').config()

function connectionToDB(){
return new Promise((resolve,reject)=>{
    let url=`mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pwd}@${process.env.server_name}/${process.env.database_name}?retryWrites=true&w=majority`
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify:true},(err)=>{
        if(!err){
            resolve(`connection done`)
        }
        else{
            reject(`connection not done`)
        }
    })
})  
}

export {connectionToDB}