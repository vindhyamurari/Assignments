import {questions} from '../models/questionSchema'

function outerFunction(request:any,response:any){
            return {
                getAllQuestions:async function getAllQuestions(){
                    const allQuestions=await questions.find()
                     if(allQuestions){
                        return allQuestions;
                     }   
                     else
                         throw new Error('Questions Not Found');
                },
                postQuestion:async function postQuestion(){
                        let newQuestion=new questions({...request.body,userId:request.user._id});
                        if(newQuestion){
                            newQuestion=await questions.create(newQuestion)
                            return newQuestion;
                        }
                        else
                        throw new Error('Cannot Post A Question');
                        
                }
            }
}

async function handleQuestionContollerFunctions(request:any,response:any,funcName:string){
    const questionControllerFuncs=outerFunction(request,response);
    try{
        // let data=await `${questionControllerFuncs}.${funcName}()`;
        let data:any;
        switch(funcName){
            case 'getAllQuestions': data=await questionControllerFuncs.getAllQuestions();break;
            case 'postQuestion': data=await questionControllerFuncs.postQuestion(); break;
        }
        response.status(200).send({data});
    }
    catch(err){
        return response.status(404).send(err)
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


//PATCH question for Up Vote
async function upVoteQuestion(request:any,response:any){
    try{
        const id=request.params.id;
        try{
            let questionfromDB=await questions.findById(id);
            try{
                let upCountPlus=new questions()
                upCountPlus={
                    question:questionfromDB.question,
                    category: questionfromDB.category,
                    answerId: questionfromDB.answerId,
                    upVoteCount: questionfromDB.upVoteCount+1,
                    downVoteCount: questionfromDB.downVoteCount,
                    userId: questionfromDB.userId
                }
                upCountPlus=await questions.findByIdAndUpdate(id,upCountPlus,{new: true}) 
                return response.status(200).send({success:true,upCountPlus})
            }
            catch{
                return response.status(404).send({success:false,message:"Cannot Update the Up Vote Count"})
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
            let questionfromDB=await questions.findById(id);
            try{
                let downCountPlus=new questions()
                downCountPlus={
                    question:questionfromDB.question,
                    category: questionfromDB.category,
                    answerId: questionfromDB.answerId,
                    upVoteCount: questionfromDB.upVoteCount,
                    downVoteCount: questionfromDB.downVoteCount+1,
                    userId: questionfromDB.userId
                }
                downCountPlus=await questions.findByIdAndUpdate(id,downCountPlus,{new: true}) 
                return response.status(200).send({success:true,downCountPlus})
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

export {/* getAllQuestions,postQuestion, */handleQuestionContollerFunctions,getQuestionById,getQuestionByCategory,getQuestionByTextSearch,upVoteQuestion,downVoteQuestion}