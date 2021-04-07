import {Book} from './Book.js'
import {BookManager} from './BookManager.js'

//Creating a Object of Book Manager class
let manageBooks:BookManager=new BookManager()

//manageBooks.clearLocalStorage();

//calling the add Book Array Function
let books:Book[]=manageBooks.getBooksFromLocalStorage();

//table element from HTML
let bookTable=document.getElementById('bookTable');

function addBookstoTable(books:Book[]){

    //emptying the array to display only search matched items
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
        btn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>`;
    
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

//Method to delete a row In HTML
bookTable?.addEventListener('click',function(e){
    let targetElement=e.target as HTMLButtonElement
    if(targetElement.classList.contains("button"))
    {
        //delete button is obtained which is 4th tr's first child
        //getting the tr to be deleted 
        let p=targetElement.parentElement?.parentElement
        //from table we want the title to delete it from local storage
        //so from tr we can get content of its first Child
        if(p?.children[0].textContent)
            manageBooks.deleteBookFromLocalStorage(p?.children[0].textContent);
        p?.remove()
    }
})

let searchButton=document.getElementById("searchBoxButton")    
let matchedbooks:Book[]
searchButton?.addEventListener('click',function(e){
    let select=document.getElementById('dropdown') as HTMLInputElement
    let value=select.value
    let searchVal=document.getElementById('pattern') as HTMLInputElement
    let searchOn=searchVal.value
    switch(value){
        case "idSearch":
        if(searchOn!=null){
         matchedbooks =manageBooks.searchOnId(books,searchOn)
        addBookstoTable(matchedbooks);
        }
        break;
        case "titleSearch":
            if(searchOn!=null){
                 matchedbooks =manageBooks.searchOnTitle(books,searchOn)
                 addBookstoTable(matchedbooks);
        }
        break;
        case "authorSearch":
            if(searchOn!=null){
                matchedbooks =manageBooks.getBooksOfGivenAuthour(books,searchOn)
                addBookstoTable(matchedbooks);
        }
        break;
        case "ratingSearch":
            if(searchOn!=null){
                matchedbooks=manageBooks.getBookswithLessRating(books,Number(searchOn))
                addBookstoTable(matchedbooks);
            }
        break;
        case "priceSearch":
            if(searchOn!=null){
                matchedbooks=manageBooks.getBooksInPriceRange(books,searchOn)
                addBookstoTable(matchedbooks);
            }
    }
})

//To get the data from the Add Books HTML Page
let onDetailsSubmit=document.getElementById('submitBookDetails')
let addDetailsform=document.forms[1]
console.log(addDetailsform);

//getting the data of book whn submit button is clicked
addDetailsform?.addEventListener('submit',function(e){
    alert('Im here')
    let field=document.getElementById('bookID') as HTMLInputElement
    let bid=Number(field.value)
    field=document.getElementById('bookTitle') as HTMLInputElement
    let title=field.value
    field =document.getElementById('author') as HTMLInputElement
    let author=field.value
    field=document.getElementById('price') as HTMLInputElement
    let price=Number(field.value)
    field=document.getElementById('rating') as HTMLInputElement
    let rating=Number(field.value)
    field=document.getElementById('details') as HTMLInputElement
    let details=field.value
    field=document.getElementById('url') as HTMLInputElement
    let url=field.value
    let newBook=new Book(bid,title,author,price,rating,details,url)
    manageBooks.addBookArray(newBook)
    window.alert("Book Added Successfully :)")
    
   
})

let btnToDisplayBooks=document.getElementById('btnToDisplayBooks')
let btnToAddBooks=document.getElementById('btnToAddBooks')
let bodyContent=document.getElementById('bookListPage');
let addContent=document.getElementById('addBookPage');

btnToAddBooks?.addEventListener('click',function(e){
    if(bodyContent)
    bodyContent.style.display='none';
    if(addContent)
    addContent.style.display='block';
})

btnToDisplayBooks?.addEventListener('click',function(e){
    if(bodyContent)
    bodyContent.style.display='block';
    if(addContent)
    addContent.style.display='none';
})