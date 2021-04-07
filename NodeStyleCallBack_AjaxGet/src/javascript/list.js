export function displayBookList(books){

    console.log(books)

    //table element from HTML
    let bookTable = document.getElementById('bookTable');

    //emptying the array to display only search matched items
    let tableRows=document.querySelectorAll('.tableRow')
    for(let row of tableRows){
        row.remove()
    }

    //adding the book details to dom
    for (let b of books) {
        
        //console.log(b.title);
        let title = b.title;
        let author = b.author;
        let rating = b.rating;
        //create elements
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
       

        //add Content
        td1.textContent = title;
        td2.textContent = author;
        td3.textContent = rating;
        

        //add Classes
        tr.classList.add('tableRow');
        td1.classList.add('tableData');
        td2.classList.add('tableData');
        td3.classList.add('tableData');
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        if(bookTable!=null)
            bookTable.appendChild(tr);
    } 

}