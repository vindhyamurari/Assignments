const fetchFromLocalStorage=()=>{
    let books:any[]=[]
    if (typeof(Storage) !== "undefined") {  
        let stringBooks = localStorage.getItem("books");
        if (stringBooks)
            books = JSON.parse(stringBooks);
        else{
            console.log('No Books In Local Storage')
            return;
        }
     } else {  
        console.log("local storage not supported");
     }  
    return books;
}
function addBooksToStorage(newBook:any) {
        let books=fetchFromLocalStorage() ;
        if(books){
            books.push(newBook);
            let stringBooks = JSON.stringify(books);
            localStorage.setItem("books", stringBooks);
        }
        else{
            localStorage.setItem("books", JSON.stringify([newBook]));
        }
        
}

function searchBooks(searchBy:string,searchText:string){
    let books=fetchFromLocalStorage();
    if(searchBy===null || searchText===null){
        return fetchFromLocalStorage();
    }
    switch(searchBy){
        case "id":let bk= books?.find((b)=>b.id===Number(searchText));
                    return [bk];
        case "title":return books?.filter((b)=>b.title.toLowerCase().indexOf(searchText.toLowerCase())!==-1);
        case "author":return books?.filter((b)=>b.author.toLowerCase().indexOf(searchText.toLowerCase())!==-1);
        case "rating":return books?.filter((b)=>b.rating>=searchText);
        case "price":let [priceLower,priceHigher]=searchText.split('-');
                    return books?.filter((b)=>b.price>=priceLower&&b.price<=priceHigher);
    }
}


export {fetchFromLocalStorage,addBooksToStorage,searchBooks} ;