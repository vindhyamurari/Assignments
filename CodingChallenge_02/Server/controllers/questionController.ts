import {questions} from '../models/questionSchema'


//GET all questions
async function getAllQuestions(request:any,response:any){
    try{
        const allQuestions=await questions.find()
        return response.status(200).send({success:true,allQuestions})
    }
    catch{
        return response.status(404).send({success:false,message:"Cannot Fetch All Questions"})
    }
}

//POST a new Question
async function postQuestion(request:any,response:any){
    try{
        let newQuestion=new questions({...request.body,userId:request.user._id});
        try{
            newQuestion=await questions.create(newQuestion)
            return response.status(201).send({success:true,newQuestion})
        }
        catch{
            return response.status(404).send({success:false,message:"Cannot Post the Question"})
        }
    }
    catch{
        return response.status(404).send({success:false,message:"Did not recieve proper Data to post"})
    }
}

//GET question by Id
async function getQuestionById(request:any,response:any){
    try{
        const id=request.params.id;
        try{
            let question=await questions.findById(id);
            return response.status(200).send({success:true,question})
        }
        catch(error){
            return response.status(404).send({success:false,message:"Cannot find the Question"})
        }  
    }
    catch(error)
    {
        return response.status(404).send({success:false,message:"Something went wrong Please Try again"})
    }
}

//GET question by Category
async function getQuestionByCategory(request:any,response:any){
    try{
        const categoryName=request.params.category;
        try{
            let allQuestion=await questions.find({​​​​​​​​ category : new RegExp(categoryName, "i") });
            return response.status(200).send({success:true,allQuestion})
        }
        catch(error){
            return response.status(404).send({success:false,message:"Cannot find the Question"})
        }  
    }
    catch(error)
    {
        return response.status(404).send({success:false,message:"Something went wrong Please Try again"})
    }
}

//GET question by Search Text
async function getQuestionByTextSearch(request:any,response:any){
    try{
        const searchText=request.params.text;
        try{
            let question=await questions.find({​​​​​​​​ question : new RegExp(searchText , "i") });
            return response.status(200).send({success:true,question})
        }
        catch(error){
            return response.status(404).send({success:false,message:"Cannot find the Question"})
        }  
    }
    catch(error)
    {
        return response.status(404).send({success:false,message:"Something went wrong Please Try again"})
    }
}


// //PATCH question for Up Vote
// async function upVoteQuestion(request:any,response:any){
//     try{
//         const id=request.params.id;
//         try{
//             let questionfromDB=await questions.findById(id);
//             try{
//                 let upCountPlus=new questions(
//                 {
//                     question:questionfromDB.question,
//                     category: questionfromDB.category,
//                     answerId: questionfromDB.answerId,
//                     upVoteCount: questionfromDB.upVoteCount+1,
//                     downVoteCount: questionfromDB.downVoteCount,
//                     userId: questionfromDB.userId
//                 })
//                 upCountPlus=await questions.findByIdAndUpdate(id,upCountPlus,{new: true}) 
//                 return response.status(200).send({success:true,upCountPlus})
//             }
//             catch{
//                 return response.status(404).send({success:false,message:"Cannot Update the Up Vote Count"})
//             }
//         }
//         catch(error){
//             return response.status(404).send({success:false,message:"Cannot find the Question"})
//         }  
//     }
//     catch(error)
//     {
//         return response.status(404).send({success:false,message:"Something went wrong Please Try again"})
//     }
// }

//PATCH question for Up Vote
async function upVoteQuestion(request:any,response:any){
    try{
        const id=request.params.id;
        try{
            let questionfromDB:any=await questions.findById(id);
            try{
                let userFound=questionfromDB.upVoteCount.likedUsers.find((userId:any)=>userId==request.user._id.toString())
               if(userFound!==undefined){
                   return response.status(404).send({success:false,message:"User cannot Like more than once"})
               }
               else{
                   questionfromDB.upVoteCount.likedUsers.push(request.user._id); 
                  let upCountPlus=new questions()
                   upCountPlus= {
                        question:questionfromDB.question,
                        category: questionfromDB.category,
                        answerId: questionfromDB.answerId,
                        upVoteCount:{
                            count:questionfromDB.upVoteCount.count+1,
                            likedUsers:[...questionfromDB.upVoteCount.likedUsers]
                        },
                        downVoteCount: questionfromDB.downVoteCount,
                        userId: questionfromDB.userId
                    }
                    upCountPlus=await questions.findByIdAndUpdate(id,upCountPlus,{new: true}) 
                    return response.status(200).send({success:true,upCountPlus})
               } 
            }
            catch{
                return response.status(404).send({success:false,message:"Cannot Like the Question"})
            }
        }
        catch(error){
            return response.status(404).send({success:false,message:"Cannot find the Question"})
        }  
    }
    catch(error)
    {
        return response.status(404).send({success:false,message:"Something went wrong Please Try again"})
    }
}

//PATCH question for down Vote
async function downVoteQuestion(request:any,response:any){
    try{
        const id=request.params.id;
        try{
            let questionfromDB:any=await questions.findById(id);
            try{
                let userFound=questionfromDB.downVoteCount.likedUsers.find((userId:any)=>userId==request.user._id.toString())
               if(userFound!==undefined){
                   return response.status(404).send({success:false,message:"User cannot Dis-Like more than once"})
               }
               else{
                   questionfromDB.downVoteCount.likedUsers.push(request.user._id); 
                  let downCountPlus=new questions()
                   downCountPlus= {
                        question:questionfromDB.question,
                        category: questionfromDB.category,
                        answerId: questionfromDB.answerId,
                        upVoteCount: questionfromDB.upVoteCount,
                        downVoteCount:{
                            count:questionfromDB.downVoteCount.count+1,
                            likedUsers:[...questionfromDB.downVoteCount.likedUsers]
                        },
                        userId: questionfromDB.userId
                    }
                    downCountPlus=await questions.findByIdAndUpdate(id,downCountPlus,{new: true}) 
                    return response.status(200).send({success:true,downCountPlus})
               } 
            }
            catch{
                return response.status(404).send({success:false,message:"Cannot Update the Down Vote Count"})
            }
        }
        catch(error){
            return response.status(404).send({success:false,message:"Cannot find the Question"})
        }  
    }
    catch(error)
    {
        return response.status(404).send({success:false,message:"Something went wrong Please Try again"})
    }
}

export {getAllQuestions,postQuestion,getQuestionById,getQuestionByCategory,getQuestionByTextSearch,upVoteQuestion,downVoteQuestion}