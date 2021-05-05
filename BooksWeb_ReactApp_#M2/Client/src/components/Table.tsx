import React, { ReactElement, useEffect, useState } from 'react'
import {  Link,Route,BrowserRouter as Router} from 'react-router-dom'
import { fetchFromLocalStorage } from '../utils'
import BookDetails from './bookDetails'
import Header from './header'
import StarRating from './starRating'

interface Props {
    dataTosearch:any
}

export default function Table({dataTosearch}: Props): ReactElement {
    let img='http://www.yosmart.com/wp-content/uploads/userguide/UserManual-400px.png';

    const [books, setbooks] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/books")
        .then((result)=> result.json())
        .then((data:any)=>setbooks(data))
    },[])
    
    useEffect(() => {
        console.log(dataTosearch)
        let searchBy=dataTosearch.searchBy
        let searchText=dataTosearch.searchText
            switch (searchBy) {
                case 'id':fetch("http://localhost:5000/books/"+searchText)
                             .then((result)=> result.json())
                             .then((data:any)=>setbooks(data)) 
                          break;
                case 'author':fetch("http://localhost:5000/books/by/"+searchText)
                                .then((result)=> result.json())
                                .then((data:any)=>setbooks(data)) 
                          break;
                case 'rating':fetch("http://localhost:5000/books/with-min-rating/"+searchText)
                                 .then((result)=> result.json())
                                 .then((data:any)=>setbooks(data)) 
                       break;
                case 'price':const [minPrice,maxPrice]=searchText.split('-')
                            fetch("http://localhost:5000/books/priced/"+minPrice+"/"+maxPrice)
                                .then((result)=> result.json())
                                .then((data:any)=>setbooks(data)) 
                    break; 
            }
            if(searchText===''){
                fetch("http://localhost:5000/books")
                    .then((result)=> result.json())
                    .then((data:any)=>setbooks(data))
            }   
    },[dataTosearch])
        return (
            <>
              {books?books[0]===undefined ?
              (<div>
              <h2 style={{margin:'10vw 7vw 0vw 40vw',}}>Book Not Found</h2>
              <img src={img} style={{margin:'0vw 0vw 0vw 32vw'}}/>
            </div>):
             <div className="card-deck">
             { books?.length===1?books.map((b:any)=>
                 <Router>
                     <Route>
                     <BookDetails key={b.id} bookId={b._id}></BookDetails>
                     </Route>
                 </Router>    
             )
             :
             books?.map((book:any)=>{
                     return (
                      <BookThumbnail book={book}  key={book.id}></BookThumbnail>
                     )
                 })
             }
         </div>:console.log('Not Found')
         }
               
    </>
    )
}


interface BookTumbnailProps {
    book:any
}

 function BookThumbnail({book}:  BookTumbnailProps): ReactElement {
    return (
        <Link to={`/bookDetails/${book._id}`}>
        <div className="card">
        <img  className="card-img-top" src={book.cover} alt="Card image cap"/>
        <div className="card-body">
        <div className="titleHolder">
          <h5 className="card-title">{book.title}</h5>
          </div>
          <p className="card-text"><b>{book.author}</b></p>
          <p className="card-text"><StarRating rating={book.rating}></StarRating></p> 
          <p className="card-text"><i className="fa fa-inr" aria-hidden="true"></i> <b>{book.price}</b></p>
        </div>
      </div>
      </Link>

    )
}




