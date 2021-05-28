import {answers} from '../models/answersSchema'
import {questions} from '../models/questionSchema'

async function getAllAnswersForQuestion(request:any,response:any){
    const id=request.params.id;
    try{
        let questionfromDB=await questions.findById(id);
        if(questionfromDB){
            let answerArray=await answers.find({questionId:id});
            return response.status(200).send({success:true,answerArray})
        }
        else{
            return response.status(404).send({success:false,message:"Cannot find the Question"})
        } 
    }
    catch(error){
        return response.status(404).send({success:false,message:"Something Went Wrong Please Try Again"})
    }  
}

async function postAnswerForQuestion(request:any,response:any){
    const id=request.params.id;
    try{
        let questionfromDB=await questions.findById(id);
        if(questionfromDB){
            let newAnswer=new answers(
            {
                answer:request.body.answer,
                questionId:id,
                userId:request.user._id
            })
            newAnswer=await answers.create(newAnswer)
            return response.status(201).send({success:true,newAnswer})
        }
        else{
            return response.status(404).send({success:false,message:"Cannot find the Question"})
        } 
    }
    catch(error){
        return response.status(404).send({success:false,message:"Something Went Wrong Please Try Again"})
    }  
}

async function upVoteAnswer(request:any,response:any){
    const id=request.params.id;
    try{
        let answerfromDB=await answers.findById(id);
        if(answerfromDB){
            try{
                let userFound=answerfromDB.upVoteCount.likedUsers.find((userId:any)=>userId==request.user._id.toString())
               if(userFound!==undefined){
                   return response.status(404).send({success:false,message:"User cannot Like more than once"})
               }
               else{
                answerfromDB.upVoteCount.likedUsers.push(request.user._id); 
                let upCountPlus=new answers()
                   upCountPlus= {
                        answer:answerfromDB.answer,
                        questionId:answerfromDB.questionId,
                        userId:answerfromDB.userId,
                        upVoteCount:{
                            count:answerfromDB.upVoteCount.count+1,
                            likedUsers:[...answerfromDB.upVoteCount.likedUsers]
                        },
                        downVoteCount:answerfromDB.downVoteCount
                    }
                    upCountPlus=await answers.findByIdAndUpdate(id,upCountPlus,{new: true}) 
                    return response.status(200).send({success:true,upCountPlus})
               }
            }
            catch{
                return response.status(404).send({success:false,message:"Cannot Like the Answer"})
            }
            
        }
        else{
            return response.status(404).send({success:false,message:"Cannot find the Answer"})
        } 
    }
    catch(error){
        return response.status(404).send({success:false,message:"Something Went Wrong Please Try Again"})
    }  
}

async function downVoteAnswer(request:any,response:any){
    const id=request.params.id;
    try{
        let answerfromDB=await answers.findById(id);
        if(answerfromDB){
            try{
                let userFound=answerfromDB.downVoteCount.likedUsers.find((userId:any)=>userId==request.user._id.toString())
               if(userFound!==undefined){
                   return response.status(404).send({success:false,message:"User cannot Dis-Like more than once"})
               }
               else{
                answerfromDB.downVoteCount.likedUsers.push(request.user._id); 
                let downCountPlus=new answers()
                   downCountPlus= {
                        answer:answerfromDB.answer,
                        questionId:answerfromDB.questionId,
                        userId:answerfromDB.userId,
                        upVoteCount:answerfromDB.upVoteCount,
                        downVoteCount:{
                            count:answerfromDB.downVoteCount.count+1,
                            likedUsers:[...answerfromDB.downVoteCount.likedUsers]
                        }
                    }
                    downCountPlus=await answers.findByIdAndUpdate(id,downCountPlus,{new: true}) 
                    return response.status(200).send({success:true,downCountPlus})
               }
            }
            catch{
                return response.status(404).send({success:false,message:"Cannot Dis-Like the Answer"})
            }
            
        }
        else{
            return response.status(404).send({success:false,message:"Cannot find the Answer"})
        } 
    }
    catch(error){
        return response.status(404).send({success:false,message:"Something Went Wrong Please Try Again"})
    }  
}

export {getAllAnswersForQuestion,postAnswerForQuestion,upVoteAnswer,downVoteAnswer}