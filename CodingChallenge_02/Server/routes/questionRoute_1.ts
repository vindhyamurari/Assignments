import express, { request } from 'express'
import {handleQuestionContollerFunctions,getQuestionById,getQuestionByCategory,getQuestionByTextSearch,upVoteQuestion,downVoteQuestion} from "../controllers/questionController_1"
import {isAuthorized} from '../controllers/userController'


let questionRouter=express.Router()

questionRouter.route('/')
    .get((request,response)=>{
       handleQuestionContollerFunctions(request,response,'getAllQuestions');
       
    })
    .post(isAuthorized,(request,response)=>{
        console.log('in question router')
        handleQuestionContollerFunctions(request,response,'postQuestion');
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