  let template = document.createElement("template");

  template.innerHTML = `
        <link rel="stylesheet" href=".././node_modules/font-awesome/css/font-awesome.min.css" >
        <link rel="stylesheet" href="../Client/sass/starRatingStyle.css">
        <div class="stars-background">
        <div class="fa-stars"></div>
        </div>
  `;
  class StarRating extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      let rating = this.getAttribute("rating");
      let rangeOf = this.getAttribute("rangeOf")||5;
      let percentage = parseFloat(rating / parseFloat(rangeOf)) * 100;
      this.shadowRoot.querySelector(
        ".stars-background .fa-stars"
      ).style.width = `${percentage}%`;
    }
  }
  export function loadCustomElement(){
    customElements.define("star-rating", StarRating);
  }

export async function displayBookList(searchPattern,keyWord){
    //getting the path where the books data is stored
    let uri='http://localhost:5000/books';

    if(searchPattern=="id"){
      uri+=`/${keyWord}`;
    }
    else if(searchPattern=="author"){
      uri+=`?${searchPattern}=${keyWord}`;
    }
   /*  else if(searchPattern){
      uri+=`?${searchPattern}_like=${keyWord}`;
      console.log("rest",uri);
    } */
    else if(searchPattern=="price"){
      let priceValues=keyWord.split('-');
      uri+=`?${searchPattern}=${priceValues[0]}&${searchPattern}=${priceValues[1]}`;
    }
    else if(searchPattern=="rating"){
      uri+=`?${searchPattern}=${keyWord}`;
    }
    else if(searchPattern=="title"){
      uri+=`?${searchPattern}=${keyWord}`;
    }
    
    //using fetch api of AJAX to that returns a promise with that requested data
    const response =await fetch(uri);
    const books=await response.json();
    //table element from HTML
    let bookTable = document.getElementById('bookTable');

    //emptying the array to display only search matched items
    let tableRows=document.querySelectorAll('.tableRow')
    for(let row of tableRows){
        row.remove()
    }
    //adding the book details to dom
    for (let b of books) {
        let title = b.title;
        let author = b.author;
        let rating = b.rating.toString();
        //create elements
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const btn = document.createElement('button');
        const btn1 = document.createElement('button');
        //add Content
        td1.textContent = title;
        td2.textContent = author;
        //td3.textContent = rating;
        //adding the 
        td3.innerHTML=`<star-rating title="${b.rating}" rating="${b.rating}"></star-rating>`
        td4.setAttribute('bookid',b._id);
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" title="Delete" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>`;
      btn.title="Delete";
      btn.id='delete';
      btn1.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" title="Details" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>`;
      btn1.title="Details";
      btn1.id='details';

        //add Classes
        tr.classList.add('tableRow');
        td1.classList.add('tableData');
        td2.classList.add('tableData');
        td3.classList.add('tableData');
        td4.classList.add('tableData');
        btn.classList.add('button');
        btn.classList.add('delete');
        btn1.classList.add('button');
        btn1.classList.add('details');
        
        //append children
        td4.appendChild(btn);
        td4.appendChild(btn1);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        if(bookTable!=null)
            bookTable.appendChild(tr);
    }

}