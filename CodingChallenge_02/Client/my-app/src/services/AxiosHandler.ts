import axios from "axios";

async function getAllQuestions() {
    let response=await axios.get("http://localhost:5000/api/questions")
    return response;
}

async function getAllAnswersForQuestion(id:any) {
    let response=await axios.get("http://localhost:5000/api/answers/for-question/"+id)
    return response;
}

async function getQuestionsByCatrgory(category:any) {
    let response=await axios.get('http://localhost:5000/api/questions/category/'+category)
    return response;
}

async function getQuestionsByText(text:any) {
    let response=await axios.get('http://localhost:5000/api/questions/search/'+text)
    return response;
}

async function postAnswer(id:any,answer:string,token:any) {
    let response=await axios.post(`http://localhost:5000/api/answers/for-question/${id}`,{answer},
    {
        headers: {
            "Authorization":token
        }
    })
    return response;
}

async function postQuestion(question:any,token:any) {
    let response=await axios.post('http://localhost:5000/api/questions',question,
    {
        headers: {
            "Authorization":token
        }
    })
    return response;
}

async function upVoteQuestion(id:any,token:any) {
    let response=await axios.patch('http://localhost:5000/api/questions/'+id,{voteType:'upVote'},
    {
        headers: {
            "Authorization":token
        }
    })
    return response;
}

async function downVoteQuestion(id:any,token:any) {
    let response=await axios.patch('http://localhost:5000/api/questions/'+id,{voteType:'downVote'},
    {
        headers: {
            "Authorization":token
        }
    })
    return response;
}

async function upVoteAnswer(id:any,token:any) {
    let response=await axios.patch('http://localhost:5000/api/answers/'+id,{voteType:'upVote'},
    {
        headers: {
            "Authorization":token
        }
    })
    return response;
}

async function downVoteAnswer(id:any,token:any) {
    let response=await axios.patch('http://localhost:5000/api/answers/'+id,{voteType:'downVote'},
    {
        headers: {
            "Authorization":token
        }
    })
    return response;
}

async function registerUser(newUser:any) {
    let response=await axios.post("http://localhost:5000/api/users/register",newUser)
   return response;
}

async function loginUser(loginDetails:any) {
    let response=await axios.post("http://localhost:5000/api/users/login",loginDetails)
    return response;
}

export {getAllQuestions,registerUser,loginUser, getAllAnswersForQuestion,postAnswer,
    getQuestionsByCatrgory,getQuestionsByText,postQuestion,upVoteQuestion,downVoteQuestion,upVoteAnswer,downVoteAnswer}