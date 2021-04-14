import mongoose from 'mongoose'
 
const bookSchema=new mongoose.Schema({
    id:{
        type:Number
    },
    isbn:{
        type:String,
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    price:{
        type:String
    },
    rating:{
        type:String
    },
    pages:{
        type:String
    },
    votes:{
        type:String
    },
    description:{
        type:String
    }
})

const model=mongoose.model('books',bookSchema)
export{model}