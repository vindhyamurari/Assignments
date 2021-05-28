import express, { request } from 'express'
import {getAllQuestions,postQuestion,getQuestionById,getQuestionByCategory,getQuestionByTextSearch,upVoteQuestion,downVoteQuestion} from "../controllers/questionController"
import {isAuthorized} from '../controllers/userController'


let questionRouter=express.Router()

questionRouter.route('/')
    .get((request,response)=>{
        getAllQuestions(request,response);
    })
    .post(isAuthorized,(request,response)=>{
        console.log('in question router')
        postQuestion(request,response);
    })
    

questionRouter.route('/:id')
    .get((request,response)=>{
        getQuestionById(request,response);
    })
    .patch(isAuthorized,(request,response)=>{
        if(request.body.voteType==='upVote'){
            upVoteQuestion(request,response)
        }
        if(request.body.voteType==='downVote')
        {
            downVoteQuestion(request,response)
        }
    })
questionRouter.get('/category/:category',(request,response)=>{
    getQuestionByCategory(request,response);
})

questionRouter.get('/search/:text',(request,response)=>{
    getQuestionByTextSearch(request,response);
})



export{questionRouter} 