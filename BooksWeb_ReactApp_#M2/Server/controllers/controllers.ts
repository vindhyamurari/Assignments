import {model as bookdb} from '../models/bookSchema'
import {user} from '../models/userSchema'

// Method : GET  function to respond with all books
 async function getAllBooks(request:any,response:any){
    try{
        const books=await bookdb.find();
        response.send(books)
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET  function to respond with book of the given Id
async function getBookById(request:any,response:any,id:any){
    try{
        let book:any
        try{
            book=await bookdb.findById(id);
        }
        catch(error){
            response.send({"message":`book ${id} not found`,id})
        }
        response.send(book)   
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET function to get books by given text
 async function getBooksBySearchOnSimpleText(request:any,response:any,searchText:string){
     //console.log('in here')
    try{
        const books = await bookdb.find({​​​​​​​​
              $or: [
                {​​​​​​​​ title: new RegExp(searchText, "i") }​​​​​​​​,
                {​​​​​​​​ author: new RegExp(searchText, "i") }​​​​​​​​,
                {​​​​​​​​ tags: new RegExp(searchText, "i") }​​​​​​​​,
                {​​​​​​​​ description: new RegExp(searchText, "i") }​​​​​​​​,
              ],
            }​​​​​​​​);
        response.send(books)
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET function to get books by Author
async function getBooksByAuthor(request:any,response:any,author:string){
    try{    
      const books=await bookdb.find({ author: new RegExp(author,'i') });
        response.send(books)
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET function to get books In price range
async function getBooksInPriceRange(request:any,response:any,minPrice:string,maxPrice:string){
    try{    
      const books=await bookdb.find({$and:[{'price':{$gte:minPrice}},{'price':{$lte:maxPrice}}]});
        response.send(books)
    }
    catch(error)
    {
        console.log(error.message)   
    }
}
async function getBooksWithMinRating(request:any,response:any,rating:string){
    try{    
        const books=await bookdb.find({'rating':{$gte:rating}});
          response.send(books)
      }
      catch(error)
      {
          console.log(error.message)   
      }
}

// Method : POST function to post the book details
async function postBook(request:any,response:any){
    try{
        let newBook=new bookdb()
        newBook.isbn=request.body.isbn;
        newBook.title=request.body.title;
        newBook.author=request.body.author;
        newBook.price=request.body.price;
        newBook.cover=request.body.cover;
        newBook.rating=request.body.rating;
        newBook.pages=request.body.pages;
        newBook.votes=request.body.votes;
        newBook.description=request.body.description;
        newBook=await bookdb.create(newBook)
        response.send(newBook)
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : PUT function to delete book with a particular
async function updateBook(request:any,response:any,id:string){
    try{
        let bookFnd:any
        try{
            bookFnd=await bookdb.findById(id);
        }
        catch(error){
            response.send({"message":`book ${id} not found`,id})
        }
            let newBook=new bookdb()
            newBook={_id:bookFnd._id,...request.body}
            newBook=await bookdb.findOneAndReplace({_id:id},newBook,{new: true}) 
            response.send(newBook) 
    }
    catch(error)
    {
        console.log(error.message)   
    }    
}

// Method : PATCH function to delete book with a particular
async function patchBook(request:any,response:any,id:string){
    try{
        let bookFnd:any
        try{
            bookFnd=await bookdb.findById(id);
        }
        catch(error){
            response.send({"message":`book ${id} not found`,id})
        }
            //alternative just use spread operator
            let newBook=new bookdb()
            newBook._id=bookFnd._id;
            newBook.isbn=request.body.isbn||bookFnd.isbn;
            newBook.title=request.body.title||bookFnd.title;
            newBook.author=request.body.author||bookFnd.author;
            newBook.price=request.body.price||bookFnd.price;
            newBook.rating=request.body.rating||bookFnd.ratin;
            newBook.pages=request.body.pages||bookFnd.pages;
            newBook.votes=request.body.votes||bookFnd.votes;
            newBook.description=request.body.description||bookFnd.description;
            newBook=await bookdb.findByIdAndUpdate(id,newBook,{new: true}) 
            response.send(newBook) 
    }
    catch(error)
    {
        console.log(error.message)   
    }    
}

// Method : DELETE function to delete book with a particular
async function deleteBook(request:any,response:any,id:string){
    try{
        let book:any
        try{
            book=await bookdb.findById(id);
        }
        catch(error){
            response.send({"message":`book ${id} not found`,id})
        }
            await bookdb.findByIdAndRemove(id)
            response.send(JSON.stringify({ message: `Book ${id} removed` }))
    }
    catch(error)
    {
        console.log(error.message)   
    }    
}


//exporting all the functions
export {getAllBooks,getBooksBySearchOnSimpleText,getBooksByAuthor,
    getBooksInPriceRange,getBookById,postBook,updateBook,patchBook,deleteBook,getBooksWithMinRating}