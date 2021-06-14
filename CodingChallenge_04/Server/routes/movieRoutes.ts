import express from 'express'
import MovieController from '../controllers/movieController';

const movieRoute=()=>{
   let movieRouter=express.Router()
   const movieController=new MovieController();

   movieRouter.get('/imdb-id/:imdbID',(request,response)=>{
        movieController.getMovieByImdbId(request,response);
   })
   movieRouter.get('/search/containing/:text',(request,response)=>{
    movieController.getMovieByText(request,response);
  })
  movieRouter.get('/top-rated-movies',(request,response)=>{
     movieController.getTopRatedMovies(request,response);
  })
  movieRouter.get('/search/:text/page/:pageNumber',(request,response)=>{
     movieController.getMovieOfPageNumber(request,response);
   })
   movieRouter.get('/book-marked/by-user/:userID',(request,response)=>{
      movieController.getBookMarkedMoviesOfUser(request,response);
   })

return movieRouter;

}

export default movieRoute