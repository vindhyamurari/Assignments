import {directors} from '../models/directorsSchema'
import {movies} from '../models/movieSchema'

//POST a new Director
async function addNewDirector(request:any,response:any) {
    try{
        let director=new directors()
        director={...request.body}
        try{
            director=await directors.create(director)
            return response.status(201).send({success:true,message:'New Director Added',director})
        }
        catch(err){
            return response.status(404).send({success:false,message:'Director Already Present'})
        } 
    }
    catch(err){
        return response.status(404).send({success:false,message:'Something Went Wrong Try Again'})
    }
}

//PATCH the director age or awardCount
async function updateDirectorDetails(request:any,response:any,name:string) {
    try{
        try{
            let director=await directors.findOne({name})
            if(director){
                let newDetails:any=new directors()
                newDetails={...request.body}
                newDetails=await directors.findByIdAndUpdate(director._id,newDetails,{new: true}) 
                return response.status(200).send({success:true,message:'Director details Updated',newDetails})
            }
            else{
                return response.status(404).send({success:false,message:'Director Not Found'})
            }
        }
        catch(err){
            return response.status(404).send({success:false,message:'Couldnt Update Director Details'})
        }
    }
    catch(err){
        return response.status(404).send({success:false,message:'Something Went Wrong Try Again'})
    }
}

//GET all the movie details on the director name given
async function getDirectorInfo(request:any,response:any,name:string) {
    try{
        try{
            let director:any=await directors.findOne({name})
            if(director){
                let allMoviesOfGivenDirector=[]
                let allMoviesFromDB=await movies.find()
                let each_Movies:any
                for(each_Movies of allMoviesFromDB){
                    for(let each_director of each_Movies.directors){
                        if(each_director===name)
                            allMoviesOfGivenDirector.push(each_Movies)
                    }
                }
                return response.status(200).send({success:true,message:'Director details Updated',allMoviesOfGivenDirector})
            }
            else{
                return response.status(404).send({success:false,message:'Director Not Found'})
            }
        }
        catch(err){
            return response.status(404).send({success:false,message:'Couldnt Update Director Details'})
        }
    }
    catch(err){
        return response.status(404).send({success:false,message:'Something Went Wrong Try Again'})
    }
}

//DELETE the given movie
async function deleteOneMovie(request:any,response:any,name:string) {
    try{
        try{
            let movie=await movies.findOne({name})
            if(movie){
               movie=await movies.findByIdAndRemove(movie._id)
                return response.status(200).send({success:true,message:'Movie Deleted'})
            }
            else{
                return response.status(404).send({success:false,message:'Movie Not Found'})
            }
        }
        catch(err){
            return response.status(404).send({success:false,message:'Couldnt Delete Movie'})
        }
    }
    catch(err){
        return response.status(404).send({success:false,message:'Something Went Wrong Try Again'})
    }
}

//POST a new Movie
async function addNewMovie(request:any,response:any) {
    try{
        let movie:any=new movies()
        movie={...request.body}
        let each_director:any
        let helper=0
        try{
            let allDirectorsfromDB=await directors.find()
            for(let one_director of movie.directors){
                for(each_director of allDirectorsfromDB){
                    if(one_director===each_director.name){
                        helper++;
                        continue
                    }
                }
            }
            if(helper===movie.directors.length){
                try{
                    movie=await movies.create(movie)
                    return response.status(201).send({success:true,message:'New Movie Added',movie})
                }
                catch(err){
                    return response.status(404).send({success:false,message:'Movie Already Present'})
                } 
            }
            else{
                return response.status(404).send({success:false,message:'Please Register the Director before Adding Movie'})
            }
        }
        catch(err){

        }
        
    }
    catch(err){
        return response.status(404).send({success:false,message:'Something Went Wrong Try Again'})
    }
}

//GET all the directors details on the movie name given
async function getMovieInfo(request:any,response:any,name:string) {
    try{
        try{
            let movie:any=await movies.findOne({name})
            if(movie){
               let allDirectors:any=await directors.find()
               let movieDirectors=[]
               for(let M_director of movie.directors){
                   for(let D_director of allDirectors){
                       if(M_director===D_director.name){
                           movieDirectors.push(D_director)
                       }
                   }
               }
                return response.status(200).send({success:true,movieDirectorsDetails:movieDirectors})
            }
            else{
                return response.status(404).send({success:false,message:'Movie Not Found'})
            }
        }
        catch(err){
            return response.status(404).send({success:false,message:'Couldnt Delete Movie'})
        }
    }
    catch(err){
        return response.status(404).send({success:false,message:'Something Went Wrong Try Again'})
    }
}

export {addNewDirector,updateDirectorDetails,getDirectorInfo, deleteOneMovie,addNewMovie,getMovieInfo}