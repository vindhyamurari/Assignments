//import * as books from './db.json';
import * as fs from 'fs';
const data:any = fs.readFileSync('./public/db.json');
let books = JSON.parse(data);
//books.books this will give each book item {} , {} as json file has { books [ {book 1},{ }... }

//Method : GET function to get all the books from the json files
 function returnAllBooks() {
    return new Promise((resolve) => {
        resolve(JSON.stringify(books))
    })
}

//Method : GET function to get a particular book by id
function returnBookById(id:string){
    return new Promise((resolve)=>{
        const book=books.books.find((b:any)=>b.id===Number(id))
        resolve(JSON.stringify(book))
    })
}

// Method : GET  function to return all books matching the given text
function returnBooksOnTextMatch(searchText:string){
    return new Promise((resolve)=>{
        let matchedBooks:any[]=[]
        searchText=searchText.toLowerCase()  
        for (const b of books.books) {
            if(b.title.toLowerCase().indexOf(searchText)!=-1){
                matchedBooks.push(b)
                continue
            }
            if(b.author.toLowerCase().indexOf(searchText)!=-1){
                matchedBooks.push(b)
                continue
            }
            if(b.description.toLowerCase().indexOf(searchText)!=-1){
                matchedBooks.push(b)
            }
        }
        resolve(JSON.stringify(matchedBooks))
    })
   
}

//Method : GET function to return books that match given author name
function returnBooksOnAuthor(author:string){
    return new Promise((resolve)=>{
        let matchedBooks:any[]=[]
        author=author.toLowerCase()  
        for (const b of books.books) {
            if(b.author.toLowerCase().indexOf(author)!=-1){
                matchedBooks.push(b)
            }
        }
        resolve(JSON.stringify(matchedBooks))
    })
   
}

//Method : GET function that returns books in the given price range
function returnBooksInPriceRange(price:string[]){
    return new Promise((resolve)=>{
        let matchedBooks:any[]=[]
        for (const b of books.books) {
            if(b.price>=price[0] && b.price<=price[1]){
                matchedBooks.push(b)
            }
        }
        resolve(JSON.stringify(matchedBooks))
    })
   
}


//Method : POST function that gets the data from the request body
function getPostedData(request:any){
    return new Promise((resolve,reject)=>{
        try{
            console.log('in getPostedData');
            let body:any=''
            request.on('data',(chunk:any)=>{
                body+=chunk.toString()
            })
            request.on('end',()=>resolve(body))
        }
        catch(error){
            reject(error)
        }
    })
}

// function update the JSON File after post put and delete
function addToJsonFile(books:any){
    fs.writeFileSync('./public/db.json',JSON.stringify(books),'utf8')
}

//Method : POST function to add new book to the JSON file
function createBookEntry(book:{}){
    return new Promise((resolve)=>{
        //generating the id by getting the last id and incrementing it by one
        let length:number=books.books.length //books[lastIndex].id
        let lastBook=books.books[length-1]
        let id:number=lastBook.id 
        console.log(id);
        id=id+1
        const newBook={'id':id,...book}
        books.books.push(newBook)
        addToJsonFile(books)
        resolve(JSON.stringify(newBook))
    })
}

// Method : PUT function to update book details
function updateBookDetails(id:string,book:any){
    return new Promise((resolve)=>{
        const index=books.books.findIndex((b:any)=>b.id===Number(id))
        let newid:number=Number(id)
        books.books[index]={id:newid,...book}
        addToJsonFile(books)
        resolve(JSON.stringify(book))
    })
}

//Method : DELETE function to remove on book details from the Json file 
function removeBookById(id:string){
    return new Promise((resolve)=>{
        const booksAfterDeletion=books.books.filter((b:any)=>b.id!==Number(id))
        books.books=booksAfterDeletion
        addToJsonFile(books)
        resolve(1)
    })
}

// exporting all the functions
 export {returnAllBooks,returnBooksOnTextMatch,returnBooksOnAuthor,
    returnBooksInPriceRange,returnBookById,getPostedData,createBookEntry,updateBookDetails,removeBookById}
