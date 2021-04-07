import { displayBookList } from "./bookList.js";

//getting the div from index.html to load the book list html div
let mainDiv = document.getElementById("content");

//implementing the search options 
function search(){
  let searchButton=document.getElementById("searchBoxButton")    
  searchButton?.addEventListener('click',function(e){
    let select=document.getElementById('dropdown') 
    let value=select.value
    let searchVal=document.getElementById('pattern')
    let searchOn=searchVal.value
    switch(value){
        case "idSearch":
        if(searchOn!=null){
          displayBookList("id",searchOn);
        }
        break;
        case "titleSearch":
            if(searchOn!=null){
              displayBookList("title",searchOn);
        }
        break;
        case "authorSearch":
            if(searchOn!=null){
              displayBookList("author",searchOn);
        }
        break;
        case "ratingSearch":
            if(searchOn!=null){
              displayBookList("rating",searchOn);
            }
        break;
        case "priceSearch":
            if(searchOn!=null){
              displayBookList("price",searchOn);
            }
    }
})

}

//function to load the bookList and its inner operations
function loadBookList(){

  //loading the BookList.html
  fetch("././views/_bookList.html")
    .then(function (response) {
      return response.text();
    })
    .then(function (bookListPage) {
      mainDiv.innerHTML = bookListPage;
      displayBookList();
      search();
      //Method to display details of a particular book
      let bookTable = document.getElementById("bookTable");
      bookTable.addEventListener("click", async function (e) {
        let targetElement = e.target;
        let id = targetElement.parentElement.getAttribute("bookid");

        //console.log(id);
        if (targetElement.classList.contains("details")) {

          //loading the BookDetails.html
          fetch("././views/_bookDetails.html")
            .then(function (response) {
              return response.text();
            })
            .then(async function (bookDetailsPage) {
              mainDiv.innerHTML = bookDetailsPage;

              //get the details of the book with particular id
              //getting the path where the books data is stored
              let uri = "http://localhost:3000/books/" + id;

              //using fetch api of AJAX to that returns a promise with that requested data
              const response = await fetch(uri);
              const book = await response.json();

              //adding contents of the book with that id to bookdetails
              document.getElementById("bookTitle").innerHTML = book.title;
              document.getElementById("bookAuthor").innerHTML = book.author;
              document.getElementById(
                "pages"
              ).innerHTML = `Pages : ${book.pages}`;
              document.getElementById(
                "price"
              ).innerHTML = `Price : ${book.price}`;
              document.getElementById(
                "rating"
              ).innerHTML = `Rating : ${book.rating}`;
              document.getElementById(
                "votes"
              ).innerHTML = `Votes : ${book.votes}`;
              document.getElementById("description").innerHTML =
                book.description;
            })
            .catch((error) => {
              console.log("Couldnt Fetch Book Details Page");
            });
        }
        if (targetElement.classList.contains("delete")) {
          let response = await fetch("http://localhost:3000/books/" + id, {
            method: "DELETE",
          });
          loadBookList();
        }
      });

    })
    .catch((error) => {
      console.log("Couldnt Fetch Book List");
    });
}
//load the book list when the webpage is loaded
window.addEventListener("DOMContentLoaded", () => {
  loadBookList();
});

//getting the bookList button
let btnBookList = document.getElementById("btnToDisplayBooks");

//loading the book List page if the above button is pressed
btnBookList.addEventListener("click", (e) => {
  loadBookList();
});

//getting the button of ADD BOOKS
mainDiv = document.getElementById("content");
let addBtn = document.getElementById("btnToAddBooks");

//adding event when the button is clicked to load bookadd html page
addBtn.addEventListener("click", (e) => {
  fetch("././views/_bookAdd.html")
    .then((res) => {
      return res.text();
    })
    .then((page) => {
      mainDiv.innerHTML = page;
      
      //getting the form
      let form = document.getElementById("addNewBook");

      //onsubmit of the form read the contents
      if (form) {
        form.addEventListener("submit", async function (e) {
          e.preventDefault();
          let field = document.getElementById("bookTitle");
          let title = field.value;
          field = document.getElementById("author");
          let author = field.value;
          field = document.getElementById("price");
          let price = Number(field.value);
          field = document.getElementById("rating");
          let rating = Number(field.value);
          field = document.getElementById("details");
          let details = field.value;
          field = document.getElementById("url");
          let url = field.value;
          let newBook = {
            isbn: 0,
            title: title,
            author: author,
            pages: 0,
            price: price,
            rating: rating,
            votes: 0,
            description: details,
            tags: [],
            series: "",
            seriesIndex: "",
            releaseDate: "",
            cover: url,
          };
          console.log(newBook);
          await fetch("http://localhost:3000/books", {
            method: "POST",
            body: JSON.stringify(newBook),
            headers: { "Content-Type": "application/json" },
          });
          window.alert("Book Added Successfully :)");
          loadBookList();
        });
      } else {
        console.log("No Form Here");
      }
    })
    .catch((err) => {
      console.log("Cannot Find Add Books Page");
    });
});
