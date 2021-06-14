import moviesModel from '../models/movieSchema';
import {users} from '../models/userSchema';
import fetch from 'node-fetch';

class UserController{

    getMovieByImdbId=async (request:any,response:any) =>{
        try{
            let imdbID=request.params.imdbID;
            let movieInDB=await moviesModel.findOne({imdbID})
            if(movieInDB){
                response.status(200).send({success:true,message:'Found From Database',movie:movieInDB})
            }
            else{
                try{
                    let fetch_response=await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=f746a82b`);
                    let movieFromOMDB=await fetch_response.json();
                    try{
                        let newMovie=new moviesModel(movieFromOMDB)
                        newMovie=await moviesModel.create(newMovie);
                        response.status(200).send({success:true,message:'Found From Newly Added In Database',movie:newMovie})
                    }
                    catch(err){
                        response.status(404).send({success:false,message:err.message,info:"Cannot add data from OMDB to Movies"})
                    }
                }
                catch(err){
                    response.status(404).send({success:false,message:err.message,info:"Cannot fetch from OMDB"})
                }
            }
        }
        catch(err){
            response.status(404).send({success:false,message:err.message})
        }   
    }
    getMovieByText=async (request:any,response:any) =>{
        try{
            let searchText=request.params.text;
        try{
        let fetch_response=await fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=f746a82b`);
        let moviesFromOMDB:any=await fetch_response.json();
        //response.status(200).send({success:true,message:"Sending from OMDB",movies:moviesFromOMDB.Search})
            try{
                for(let movie of moviesFromOMDB.Search){
                    let movieInDB=await moviesModel.findOne({imdbID:movie.imdbID})
                    if(!movieInDB){
                        try{
                            let fetch_response=await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=f746a82b`);
                            let movieFromOMDB=await fetch_response.json();
                            try{
                                let newMovie=new moviesModel(movieFromOMDB)
                                newMovie=await moviesModel.create(newMovie);
                            }
                            catch(err){
                               console.log('Error while adding message into database',err.message);
                            }
                        }
                        catch(err){
                            console.log('Error while fetching movies while getting all info and adding into database',err.message);
                        }
                    }
                }
            }
            catch(err){
                response.status(404).send({success:false,message:err.message,info:"Cannot add data from OMDB to Movies"})
            }
            
            response.status(200).send({success:true,message:"Sending from OMDB",searchedMovies:moviesFromOMDB.Search})
        }
            catch(err){
                response.status(404).send({success:false,message:err.message,info:'Error in fetch'})
            }  

        }
        catch(err){
            response.status(404).send({success:false,message:err.message})
        }  
      
    }

    getTopRatedMovies=async (request:any,response:any) =>{
        try{
            let topRatedMovies=await moviesModel.find({imdbRating:{$ne:'N/A'}}).sort({imdbRating:-1}).limit(8);
            response.status(200).send({success:true,message:'Found From Database',topRatedMovies})
        }
        catch(err){
            response.status(404).send({success:false,message:err.message})
        }
    }

    getMovieOfPageNumber=async (request:any,response:any) =>{
        try{
            let text=request.params.text;
            let pageNumber=request.params.pageNumber;
            let fetch_response=await fetch(`http://www.omdbapi.com/?s=${text}&page=${pageNumber}&apikey=f746a82b`);
            let movieFromOMDB=await fetch_response.json();
            
            if(movieFromOMDB.Response===false){
                response.status(404).send({success:false,message:'No Result Found'})
            }
            response.status(200).send({success:true,message:`Found From Page Number ${pageNumber}`,movies:movieFromOMDB.Search})
        }
        catch(err){
            response.status(404).send({success:false,message:err.message})
        }
    }

    getBookMarkedMoviesOfUser=async (request:any,response:any) =>{
        try{
            let userID=request.params.userID;
            try{
                let user=await users.findById(userID);
                try{
                    let bookmarkedMovies=await moviesModel.find({imdbID:{$in:user.bookmarks}})
                    response.status(200).send({success:true,message:'Book Marked Movies',bookmarkedMovies})
                }
                catch(err){
                    response.status(404).send({success:false,message:err.message})
                }
            }
            catch(err){
                response.status(404).send({success:false,message:'User Not Found'})
            }
        }
        catch(err){
            response.status(404).send({success:false,message:err.message})
        }
    }

}

export default UserController;





