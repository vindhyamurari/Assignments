import http from 'http';
import {getAllBooks,getBookById,getBooksBySearchOnSimpleText,getBooksByAuthor,
    getBooksInPriceRange,postBook,updateBook,deleteBook} from './controllers/controllers';
import {connectionToDB} from './models/connection';

const port=  5000
const hostname='127.0.0.1';

const server=http.createServer(function(request,response){
        const queryString=request.url?.split('?')[1]
        const reqURL=new URLSearchParams(queryString)
   if(request.url==='/books' && request.method=='GET'){
       //call method to send all books 
       getAllBooks(request,response)
   }
   else if(request.url?.match(/\/books\/[0-9]+/) && request.method=='GET'){
       const id=request.url.split('/')[2]
       //calling the method to get book by the given id
        getBookById(request,response,id)
   } 
   else if(reqURL.has('q') && request.method=='GET'){
        let simpleText=reqURL.get('q')
        // calling the function to get books that match given keyword
        if(simpleText)
            getBooksBySearchOnSimpleText(request,response,simpleText)
   }
   else if(reqURL.has('author') && request.method=='GET'){
       let author=reqURL.get('author')
       //calling the function to get books that match given author
       if(author)
            getBooksByAuthor(request,response,author)
   }
   else if(reqURL.has('price') && request.method=='GET'){
       let priceRange=reqURL.getAll('price')//['200','400']
      // calling the function to get books that are in the price range
       if(priceRange)
            getBooksInPriceRange(request,response,priceRange)
   } 
   else if(request.url==='/books' && request.method=='POST'){
       //calling the function to post the details of the book
        postBook(request,response)
   }
   else if(request.url?.match(/\/books\/[0-9]+/) && request.method=='PUT'){
        const id=request.url.split('/')[2]
        //calling the function to put the details of the book
        updateBook(request,response,id)
   }
   else if(request.url?.match(/\/books\/[0-9]+/) && request.method=='DELETE'){
    const id=request.url.split('/')[2]
    //calling the function to delete the particular book by id
       deleteBook(request,response,id)
   }
   else{
       response.end(`Url not found`)
   }

})

//check if the port is not ready to be used
server.on('error',(err)=>{console.log(err.message);
})

//make the server active by listening to the port number 
server.listen(port,hostname,async ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
    await connectionToDB()
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error.message);
    })
});