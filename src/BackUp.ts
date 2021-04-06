import {Book} from './Book.js'  

let books:Book[]=[];
books.push(new Book(1,"When u succeed ","Ramji singh",200,8.3,"Book On Path to Success"));
books.push(new Book(2,"Dark Sky Day","Niveditha Rai",450,6.3,"On the dream"));
books.push(new Book(3,"Ocean screams ","Gowri das",350,5.6,"Heights Of life"));
books.push(new Book(4,"God Of Horror ","Ajith Ram",750,9.8,"Heights Of life"));
books.push(new Book(5,"The Moon Light ","Scarlet Reo",800,7.5,"Heights Of life"));
books.push(new Book(6,"Blues n' Pinks ","Kithen Kumar",322,8.3,"Heights Of life"));

//table element from HTML
let bookTable=document.getElementById('bookTable');

function addBookstoTable(books:Book[]){

    //emptying the array
    let tableRows=document.querySelectorAll('.tableRow')
    for(let row of tableRows){
        row.remove()
    }

    //add books to table of HTML index page

    for(let b of books){
        let title=b.title;
        let author=b.author;
        let rating =b.rating.toString();
    
        //create elements
        const tr=document.createElement('tr');
        const td1=document.createElement('td');
        const td2=document.createElement('td');
        const td3=document.createElement('td');
        const td4=document.createElement('td');
        const btn=document.createElement('button');
    
        //add Content
        td1.textContent=title;
        td2.textContent=author;
        td3.textContent=rating;
        btn.innerHTML="Delete";
    
        //add Classes
        tr.classList.add('tableRow');
        td1.classList.add('tableData');
        td2.classList.add('tableData');
        td3.classList.add('tableData');
        td4.classList.add('tableData');
        btn.classList.add('button');
    
        //append children
        td4.appendChild(btn);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        bookTable?.appendChild(tr);
    }
    
}
addBookstoTable(books);


bookTable?.addEventListener('click',function(e){
    let targetElement=e.target as HTMLButtonElement
    if(targetElement.classList.contains("button"))
    {
        let p=targetElement.parentElement?.parentElement
        p?.remove()
    }
})

const form=document.forms[0]
let idButton=document.getElementById("bookId")
let searchButton=document.getElementById("bookText")

idButton?.addEventListener('click',function(e){
   
    let searchVal=document.getElementById('pattern') as HTMLInputElement
    let searchNumber=searchVal.value
    if(searchNumber!=null){
        let idMatchedbooks:Book[]=searchOnId(books,searchNumber)
    addBookstoTable(idMatchedbooks);
    }
    
    
})

function searchOnId(books:Book[],searchNum:string){
    let idsearchedBooks:Book[]=[];
    for(let b of books){
        let myNum=b.bookId.toString()
        if(myNum==searchNum){
            idsearchedBooks.push(b);
        }
    }
    return idsearchedBooks;
}

searchButton?.addEventListener('click',function(e){
   
    let searchVal=document.getElementById('pattern') as HTMLInputElement
    let searchText=searchVal.value
    console.log("Search Of "+searchText);
    if(searchText!=null){
        let TextMatchedbooks:Book[]=searchOnText(books,searchText)
    addBookstoTable(TextMatchedbooks);
    }
})

//Method for Displaying All Books n Console
console.log("Get All Books In the Table");
console.log(books);

// Method to search books based on the text
function searchOnText(books:Book[],searchText:string){
    let searchedBooks:Book[]=[]
    searchText=searchText.toLowerCase();
    for(let b of books){
        if(b.title.toLowerCase().indexOf(searchText)!=-1){
            searchedBooks.push(b)
            continue;
        } 
        if(b.author.toLowerCase().indexOf(searchText)!=-1){
            searchedBooks.push(b)
            continue;
        }
        if(b.details.toLowerCase().indexOf(searchText)!=-1){
            searchedBooks.push(b)
            continue;
        }
    }
    console.log("searchedBooks "+searchedBooks)
    return searchedBooks
}

//Method to get books on the given authour name

function getBooksOfGivenAuthour(books:Book[],searchText:string){
    let searchedBooks:Book[]=[]
    searchText=searchText.toLowerCase();
    for(let b of books){
        b.author=b.author
        if(b.author.toLowerCase().indexOf(searchText)!=-1){
            searchedBooks.push(b)
            continue;
        }
    }
    return searchedBooks

}
console.log("Books List Searched by Authour");
console.log(getBooksOfGivenAuthour(books,"Das"))

//Method to get all books with rating less than given rating
function getBookswithLessRating(books:Book[],rating:number){
    let searchedBooks:Book[]=[]
    for(let b of books){
        if(b.rating<=rating)
            searchedBooks.push(b)
    }
    return searchedBooks
}

console.log("Books List Searched by Ratings Less Than given Rating");
console.log(getBookswithLessRating(books,6.5))

//Method to get all Books with in the given price range
function getBooksInPriceRange(books:Book[],minPrice:number,maxPrice:number){
    let searchedBooks:Book[]=[]
    for(let b of books){
        if(b.price>=minPrice && b.price<=maxPrice)
            searchedBooks.push(b)
    }
    return searchedBooks
}
console.log("Books List Searched Within the given price Range");
console.log(getBooksInPriceRange(books,100,500))


