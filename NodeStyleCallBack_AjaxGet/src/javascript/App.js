import { displayBookList } from "./list.js";

//getting the div from index.html to load the book list html div

let mainDiv = document.getElementById("content");

window.addEventListener("DOMContentLoaded", () => {
    fetch("././views/_bookList.html")
    .then(function (response) {
      return response.text();
    })
    .then(function (bookListPage) {
      mainDiv.innerHTML = bookListPage;

      function ajaxGet(uri,callback){
        let xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(xhttp.readyState==4){
                if(xhttp.status==200){
                    callback(null,JSON.parse(xhttp.responseText)); 
                }
                else{
                   callback(new Error('Books Not Found'));
                }    
            }
        }
        xhttp.open('get',uri,true)
        xhttp.send();
      }
       let callback=(error,books)=>{
        if(error){
            console.log("error", error.statusCode);
        } else{
          displayBookList(books);
        }
      }
      ajaxGet('http://localhost:3000/books',callback)
      
    })
    .catch((error) => {
        console.log("Couldnt Fetch Book List");
    })
  });

