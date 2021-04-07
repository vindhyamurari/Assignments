import {Book} from './Book.js'  

export class BookManager{

    addBookArray(oneBook:Book){
        //Method to add details of one New Book and add it to local storage
        let returnedBooks:Book[]=[]
        if (typeof(Storage) !== "undefined") {  
            //get the books array from local storage
            let stringReturnedBooks= localStorage.getItem("books")  
            //add the new book to the array 
            if(stringReturnedBooks!=null)
             returnedBooks=JSON.parse(stringReturnedBooks)
             returnedBooks.push(oneBook)
             /*  returnedBooks.push(new Book(1,"When u succeed ","Ramji singh",200,8.3,"Book On Path to Success"));
              returnedBooks.push(new Book(2,"Dark Sky Day","Niveditha Rai",450,6.3,"On the dream"));
              returnedBooks.push(new Book(3,"Ocean screams ","Gowri das",350,5.6,"Heights Of life"));
              returnedBooks.push(new Book(4,"God Of Horror ","Ajith Ram",750,9.8,"Heights Of life"));
              returnedBooks.push(new Book(5,"The Moon Light ","Scarlet Reo",800,7.5,"Heights Of life"));
              returnedBooks.push(new Book(6,"Blues n' Pinks ","Kithen Kumar",322,8.3,"Heights Of life"));   */
              console.log(returnedBooks);
              
             //place back the new array after adding new element
            let stringBooks=JSON.stringify(returnedBooks)
            localStorage.setItem("books",stringBooks)   
            } 
        else {   
                console.log("Local Storage not Found while Pushing the Data");
                
            }  
    }

    getBooksFromLocalStorage(){
        //Method to get the details from the local storage
        let returnedBooks:Book[]=[]
        if (typeof(Storage) !== "undefined") {  
            let stringReturnedBooks= localStorage.getItem("books")   
            if(stringReturnedBooks!=null)
             returnedBooks=JSON.parse(stringReturnedBooks)
             
         } 
         else {   
             console.log("Local Storage not Found while Getting the Data");
             
         } 
              
        return returnedBooks
    }

    deleteBookFromLocalStorage(title:string){
        let returnedBooks:Book[]=[]
        if (typeof(Storage) !== "undefined") {  
            // get books array from local storage
            let stringReturnedBooks= localStorage.getItem("books")   
            if(stringReturnedBooks!=null)
             returnedBooks=JSON.parse(stringReturnedBooks)
             //check for the position of the deleted element and delete in array
             for(let i=0;i<returnedBooks.length;i++){
                 if(returnedBooks[i].title==title){
                     returnedBooks.splice(i,1);
                     break;
                 }
             }
             // the new array after deletion to the local storage
             let stringBooks=JSON.stringify(returnedBooks)
             localStorage.setItem("books",stringBooks)    
             
         } 
         else {   
             console.log("Local Storage not Found while Getting the Data");
             
         } 
    }

    searchOnId(books:Book[],searchNum:string){
        //Method to search Books on ID 
        let idsearchedBooks:Book[]=[];
        for(let b of books){
            let myNum=b.bookId.toString()
            if(myNum==searchNum){
                idsearchedBooks.push(b);
            }
        }
        return idsearchedBooks
    }

    searchOnTitle(books:Book[],searchText:string){
        //Method for Displaying All Books n Console
        let searchedBooks:Book[]=[]
        searchText=searchText.toLowerCase();
        for(let b of books){
            if(b.title.toLowerCase().indexOf(searchText)!=-1){
                searchedBooks.push(b)
                continue;
            }
        }
        console.log("searchedBooks "+searchedBooks)
        return searchedBooks
    }

    getBooksOfGivenAuthour(books:Book[],searchText:string){
        //Method to get books on the given authour name
        let searchedBooks:Book[]=[]
        searchText=searchText.toLowerCase();
        for(let b of books){
            if(b.author.toLowerCase().indexOf(searchText)!=-1){
                searchedBooks.push(b)
                continue;
            }
        }
        return searchedBooks
    
    }

    getBookswithLessRating(books:Book[],rating:number){
        //Method to get all books with rating less than given rating
        let searchedBooks:Book[]=[]
        for(let b of books){
            if(b.rating<=rating)
                searchedBooks.push(b)
        }
        return searchedBooks
    }

    getBooksInPriceRange(books:Book[],price:string){
        //Method to get all Books with in the given price range
        let pricevalues=price.split('-')
        let searchedBooks:Book[]=[]
        for(let b of books){
            if(b.price>=Number(pricevalues[0]) && b.price<=Number(pricevalues[1]))
                searchedBooks.push(b)
        }
        return searchedBooks
    }

   /*  //to clear local Storage 
    clearLocalStorage(){
        if (typeof(Storage) !== "undefined")
             localStorage.clear();
    }  */
}