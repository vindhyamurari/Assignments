import express, { request } from 'express'
import {getAllDirectors,addNewDirector,updateDirectorDetails,getDirectorInfo,getAllMovies, deleteOneMovie,addNewMovie,getMovieInfo} from '../controllers/controller'

let router=express.Router()


router.route('/directors')
    //GET all Directors
    .get((request,response)=>{
        getAllDirectors(request,response);
    })
    //POST a new Director
    .post((request,response)=>{
        addNewDirector(request,response);
    })

router.route('/director/:name')
    //PATCH the director age or awardCount
    .patch((request,response)=>{
        updateDirectorDetails(request,response,request.params.name);
    })
    //GET all the movie details on the director name given
    .get((request,response)=>{
        getDirectorInfo(request,response,request.params.name)
    })

router.route('/movies')
    //GET All Movies
    .get((request,response)=>{
        getAllMovies(request,response)
    })
    //POST a new Movie
    .post((request,response)=>{
        addNewMovie(request,response)
    })

router.route('/movie/:name')
    //GET all the directors details on the movie name given 
    .get((request,response)=>{
        getMovieInfo(request,response,request.params.name)
    })
    //DELETE the given movie
    .delete((request,response)=>{
        deleteOneMovie(request,response,request.params.name)
    })


export {router}