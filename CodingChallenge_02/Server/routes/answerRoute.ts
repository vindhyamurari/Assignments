import express, { request } from 'express'
import {getAllAnswersForQuestion,postAnswerForQuestion,upVoteAnswer,downVoteAnswer} from '../controllers/answerController'
import {isAuthorized} from '../controllers/userController'

let answerRouter=express.Router()

answerRouter.route('/for-question/:id')
    .get((request,response)=>{
        getAllAnswersForQuestion(request,response);
    })
    .post(isAuthorized,(request,response)=>{
        postAnswerForQuestion(request,response);
    })

answerRouter.patch('/:id',isAuthorized,(request,response)=>{
    if(request.body.voteType==='upVote'){
        upVoteAnswer(request,response)
    }
    if(request.body.voteType==='downVote')
    {
        downVoteAnswer(request,response)
    }
})

export{answerRouter} 