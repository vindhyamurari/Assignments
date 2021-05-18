import axios from 'axios'


async function getAllBooks(){
    let res=await axios.get("http://localhost:5000/books")
    return res.data
}

async function getBooksBySearch(searchBy:string,searchText:string){
    let response:any;
    if(searchText===""){
        response=await axios.get("http://localhost:5000/books") 
        return response.data;
     } 
    switch (searchBy) {
        case 'id': response=await axios.get("http://localhost:5000/books/"+searchText)
                    return [response.data];        
        case 'author':response=await axios.get("http://localhost:5000/books/by/"+searchText)
                    return response.data;   
        case 'rating': response=await axios.get("http://localhost:5000/books/with-min-rating/"+searchText)
                    return response.data;     
        case 'price':const [minPrice,maxPrice]=searchText.split('-')
                    response=await axios.get("http://localhost:5000/books/priced/"+minPrice+"/"+maxPrice)
                    return response.data;     
    }
}

async function getBookById(id:string) {
    let response=await axios.get("http://localhost:5000/books/"+id)
    console.log(`in Handler book`, response.data)
     return response.data;   
}

async function registerUser(newUser:any) {
     let response=await axios.post("http://localhost:5000/users/register",newUser)
     console.log('response ' , response)
    return response;
}

async function loginUser(loginDetails:any) {
    let response=await axios.post("http://localhost:5000/users/login",loginDetails)
    return response;
}

async function addBook(book:any,token:string){
        let response=await axios.post('http://localhost:5000/books',book,
        {
            headers: {
                "Authorization":token
            }
        })
        return response;
}

async function deleteBookFromDB(bookId:string,token:string) {
  let response=await axios.delete("http://localhost:5000/books/"+bookId,{
    headers: {
      "Authorization":token
   }}
  )
  return response;
}

async function sendPhoneToGetOTP(phone:string) {
    phone=`+91${phone}`;
    let response=await axios.post("http://localhost:5000/users/sendOTP",{phone})
    return response;
}

async function verifyOTP(otp:string,userData:string) {
    let response=await axios.post("http://localhost:5000/users/verifyOTP",{otp,userData})
    return response;
}


export {getAllBooks,getBooksBySearch,getBookById,registerUser,loginUser,addBook,deleteBookFromDB,sendPhoneToGetOTP,verifyOTP}