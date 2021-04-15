import {model as bookdb} from '../models/bookSchema'
import {getPostedData} from '../models/utils';


// Method : GET  function to respond with all books
 async function getAllBooks(request:any,response:any){
    try{
        const books=await bookdb.find();
        console.log(books);
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(JSON.stringify(books))
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET  function to respond with book of the given Id
async function getBookById(request:any,response:any,id:string){
    try{
        let book:any
        try{
            book=await bookdb.findById(id);
        }
        catch(error){
            response.writeHead(404,{'Content-Type':'application/json'})
            response.end(JSON.stringify({"message":`book ${id} not found`,id}))
        }
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(JSON.stringify(book))
        
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET function to get books by given text
 async function getBooksBySearchOnSimpleText(request:any,response:any,searchText:string){
    try{    
      const books=await bookdb.find({$or:[{'title':searchText},{'author':searchText},{'description':searchText}]});
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(JSON.stringify(books))
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET function to get books by Author
async function getBooksByAuthor(request:any,response:any,author:string){
    try{    
      const books=await bookdb.find({'author':author});
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(JSON.stringify(books))
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET function to get books In price range
async function getBooksInPriceRange(request:any,response:any,price:string[]){
    try{    
      const books=await bookdb.find({$and:[{'price':{$gte:price[0]}},{'price':{$lte:price[1]}}]});
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(JSON.stringify(books))
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : POST function to post the book details
async function postBook(request:any,response:any){
    try{
        const body:any=await getPostedData(request)
        const {title,author,rating,price,pages,votes,description}=JSON.parse(body)
        const book={title,author,rating,price,pages,votes,description}
        const newBook=await bookdb.create(book)
        response.writeHead(201,{'Content-Type':'application/json'})
        response.end(JSON.stringify(newBook))
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : PUT function to delete book with a particular
async function updateBook(request:any,response:any,id:any){
    try{
        let bookFnd:any
        try{
            bookFnd=await bookdb.findById(id);
        }
        catch(error){
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify('Book Not Found'))
        }
        
            const body:any=await getPostedData(request)
            const {title,author,rating,price,pages,votes,description}=JSON.parse(body)
            //let bookFound=JSON.parse(bookFnd)
            const book:{}={
                title:title||bookFnd.title,
                author:author||bookFnd.author,
                rating:rating||bookFnd.rating,
                price:price||bookFnd.price,
                pages:pages||bookFnd.pages,
                votes:votes||bookFnd.votes,
                description:description||bookFnd.description
            }    
            const newBook=await bookdb.findByIdAndUpdate(id,book,{new: true})        
            response.writeHead(200,{'Content-Type':'application/json'})
            response.end(JSON.stringify(newBook))

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
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify('Book Not Found'))
        }
        await bookdb.findByIdAndRemove(id)
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ message: `Book ${id} removed` }))
     
    }
    catch(error)
    {
        console.log(error.message)   
    }    
}

//exporting all the functions
export {getAllBooks,getBooksBySearchOnSimpleText,getBooksByAuthor,
    getBooksInPriceRange,getBookById,postBook,updateBook,deleteBook}