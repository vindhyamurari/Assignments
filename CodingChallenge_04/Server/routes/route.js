"use strict";
// import express from 'express'
// import UserController from '../controllers/userController'
// const AnswerRoute=()=>{
//     let answerRouter=express.Router()
//     const userController=new UserController();
//     const answerController=new AnswerController();
// answerRouter.route('/for-question/:id')
//     .get((request,response)=>{
//         answerController.getAllAnswersForQuestion(request,response);
//     })
//     .post(userController.isAuthorized,(request,response)=>{
//         answerController.postAnswerForQuestion(request,response);
//     })
// answerRouter.patch('/:id',userController.isAuthorized,(request,response)=>{
//     if(request.body.voteType==='upVote'){
//         answerController.upVoteAnswer(request,response)
//     }
//     if(request.body.voteType==='downVote')
//     {
//         answerController.downVoteAnswer(request,response)
//     }
// })
// answerRouter.get('/my-answers/:userId',(request,response)=>{
//     answerController.getAllAnswersOfUser(request,response);
// })
// answerRouter.get('/my-liked-answers/:userId',(request,response)=>{
//     answerController.getAllLikedAnswersOfUser(request,response);
// })
// return answerRouter;
// }
// export default AnswerRoute
