import express, { request } from 'express'
import {addNewDirector,updateDirectorDetails,getDirectorInfo, deleteOneMovie,addNewMovie,getMovieInfo} from '../controllers/controller'

let router=express.Router()

//POST a new Director
router.post('/directors',(request,response)=>{
    addNewDirector(request,response);
})

//PATCH the director age or awardCount
router.patch('/director/:name',(request,response)=>{
    updateDirectorDetails(request,response,request.params.name);
})

//GET all the movie details on the director name given
router.get('/director/:name',(request,response)=>{
    getDirectorInfo(request,response,request.params.name)
})

//DELETE the given movie
router.delete('/movie/:name',(request,response)=>{
    deleteOneMovie(request,response,request.params.name)
})

//POST a new Movie
router.post('/movies',(request,response)=>{
    addNewMovie(request,response)
})

//GET all the directors details on the movie name given 
router.get('/movie/:name',(request,response)=>{
    getMovieInfo(request,response,request.params.name)
})

export {router}