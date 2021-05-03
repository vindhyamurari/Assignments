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
    console.log('s books',searchedBooks)
    let fetchedBooks=fetchFromLocalStorage()
    const [books, setbooks] = useState(fetchedBooks)
    console.log(`fetchFromLocalStrage()`, fetchFromLocalStorage())
    console.log('1',books)
    useEffect(() => {
        if(searchedBooks.length!==0){
            console.log('I am doing this')
         setbooks(searchedBooks)
        }
    })
    console.log('2',books)
        return (
            <>
                <div className="card-deck">
                    { books?.length===1?books.map((b:any)=>(
                        <Router>
                            <Route>
                            <BookDetails key={b.id} id={b.id}></BookDetails>
                            </Route>
                        </Router>    
                    ))
                    :
                    books?.map((book:any)=>{
                            return (
                             <BookThumbnail book={book} forRedirect={forRedirect} key={book.id}></BookThumbnail>
                            )
                        })
                    }
                </div>
            </>
    )
}


interface BookTumbnailProps {
    book:any,
    forRedirect:Function
}

 function BookThumbnail({book,forRedirect}:  BookTumbnailProps): ReactElement {
    return (
        <Link to='/bookDetails' >
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




