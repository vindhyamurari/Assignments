import React, { ReactElement, useEffect, useState } from 'react'
import {  Link,Route,BrowserRouter as Router} from 'react-router-dom'
import { fetchFromLocalStorage } from '../utils'
import BookDetails from './bookDetails'
import StarRating from './starRating'

interface Props {
    searchedBooks:any
    forRedirect:Function
}

export default function Table({searchedBooks,forRedirect}: Props): ReactElement {
    let img='http://www.yosmart.com/wp-content/uploads/userguide/UserManual-400px.png';
    let fetchedBooks=fetchFromLocalStorage()
    const [books, setbooks] = useState(fetchedBooks)
    useEffect(() => {
        if(searchedBooks.length!==0){
         setbooks(searchedBooks)
        }
    })
    console.log(`books`, books)
    console.log(`typeof books`, typeof books)
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
                     <BookDetails key={b.id} bookId={b.id}></BookDetails>
                     </Route>
                 </Router>    
             )
             :
             books?.map((book:any)=>{
                     return (
                      <BookThumbnail book={book} forRedirect={forRedirect} key={book.id}></BookThumbnail>
                     )
                 })
             }
         </div>:console.log('Not Found')
         }
               
            </>
    )
}


interface BookTumbnailProps {
    book:any,
    forRedirect:Function
}

 function BookThumbnail({book,forRedirect}:  BookTumbnailProps): ReactElement {
    return (
        <Link to={`/bookDetails/${book.id}` }>
        <div className="card"  onClick={()=>forRedirect(book.id)}>
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




