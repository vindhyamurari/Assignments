import express from "express";
import {handleRequest} from '../controllers/generic-controller';
import { authenticate } from "../services/user-authentication";


export default (movieService:any)=>{

    const router=express.Router();
 
    router
        .route("/")
        .get(handleRequest(movieService.getAllMovies))
        .post(authenticate,handleRequest(movieService.addMovie));

    
    router
        .route("/:id")
        .get(handleRequest(movieService.getMovieById))
        .delete(handleRequest(movieService.removeMovieById));

        

    router
        .route("/with-actor/:actor")
        .get(async(request:any,response:any)=>{
            
            //write your logic here
            //no controller or service avialable.
            //this is an untestable block of code

        });

    return router;

};