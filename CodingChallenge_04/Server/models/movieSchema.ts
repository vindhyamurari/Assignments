import mongoose from 'mongoose'
 
const movieSchema=new mongoose.Schema({
    imdbID:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Year:{
        type:String,
        required:true
    },
    Released:{
        type:String
    },
    Runtime:{
        type:String
    },
    Genre:{
        type:String
    },
    Director:{
        type:String
    },
    Writer:{
        type:String
    },
    Actors:{
        type:String
    },
    Language:{
        type:String
    },
    Country:{
        type:String
    },
    imdbRating:{
        type:String
    },
    imdbVotes:{
        type:String
    },
    Poster:{
        type:String
    }
})

const model=mongoose.model('movies',movieSchema)
export default model;