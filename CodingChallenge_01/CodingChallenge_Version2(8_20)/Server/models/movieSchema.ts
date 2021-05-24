import mongoose from 'mongoose'

const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    movieId:{
        type:Number,
        required:true
    },
    boxOfficeCollection:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    directors:{
        type:Array,
        required:true
    }
   
})

const movies=mongoose.model('movies',movieSchema)
export {movies}