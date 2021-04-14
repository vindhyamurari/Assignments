import {returnAllBooks,returnBookById,returnBooksOnTextMatch,
    returnBooksOnAuthor,returnBooksInPriceRange,getPostedData,createBookEntry,updateBookDetails,removeBookById} from './model';


// Method : GET  function to respond with all books
 async function getAllBooks(request:any,response:any){
    try{
        const books=await returnAllBooks();
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(books)
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET  function to respond with book of the given Id
async function getBookById(request:any,response:any,id:string){
    try{
        const book=await returnBookById(id);
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(book)
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET function to get books by given text
 async function getBooksBySearchOnSimpleText(request:any,response:any,searchText:string){
    try{    
      const books=await returnBooksOnTextMatch(searchText);
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(books)
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET function to get books by Author
async function getBooksByAuthor(request:any,response:any,author:string){
    try{    
      const books=await returnBooksOnAuthor(author);
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(books)
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : GET function to get books In price range
async function getBooksInPriceRange(request:any,response:any,price:string[]){
    try{    
      const books=await returnBooksInPriceRange(price);
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(books)
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : POST function to get books In price range
async function postBook(request:any,response:any){
    try{
        const body:any=await getPostedData(request)
        const {title,author,rating,price,pages,votes,description}=JSON.parse(body)
        const book={title,author,rating,price,pages,votes,description}
        const newBook=await createBookEntry(book)
        response.writeHead(201,{'Content-Type':'application/json'})
        response.end(newBook)
    }
    catch(error)
    {
        console.log(error.message)   
    }
}

// Method : PUT function to delete book with a particular
async function updateBook(request:any,response:any,id:string){
    try{
        const bookFnd:any=await returnBookById(id);
        if(!bookFnd) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify('Book Not Found'))
        }
        else {
            const body:any=await getPostedData(request)
            const {title,author,rating,price,pages,votes,description}=JSON.parse(body)
            let bookFound=JSON.parse(bookFnd)
            const book:{}={
                title:title||bookFound.title,
                author:author||bookFound.author,
                rating:rating||bookFound.rating,
                price:price||bookFound.price,
                pages:pages||bookFound.pages,
                votes:votes||bookFound.votes,
                description:description||bookFound.description
            }
            console.log(book);
            
            const newBook=await updateBookDetails(id,book)
            response.writeHead(200,{'Content-Type':'application/json'})
            response.end(newBook)
        }  
    }
    catch(error)
    {
        console.log(error.message)   
    }    
}

// Method : DELETE function to delete book with a particular
async function deleteBook(request:any,response:any,id:string){
    try{
        const book=await returnBookById(id);
        if(!book) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify('Book Not Found'))
        }
        else {
            await removeBookById(id)
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: `Book ${id} removed` }))
        }  
    }
    catch(error)
    {
        console.log(error.message)   
    }    
}

//exporting all the functions
export {getAllBooks,getBooksBySearchOnSimpleText,getBooksByAuthor,
    getBooksInPriceRange,getBookById,postBook,updateBook,deleteBook}