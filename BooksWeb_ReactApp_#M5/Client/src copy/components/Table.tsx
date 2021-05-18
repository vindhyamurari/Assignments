import React, { ReactElement, useContext, useEffect, useState } from 'react'
import {  Link,Route,BrowserRouter as Router} from 'react-router-dom'
import BookDetails from './bookDetails'
import StarRating from './starRating'
import axios from 'axios'
import { UserContext } from '../UserContext'
import { searchBooks } from '../utils'

interface Props {

}

export default function Table({}: Props): ReactElement {
    let img='http://www.yosmart.com/wp-content/uploads/userguide/UserManual-400px.png';

    const {state} = useContext(UserContext)
    console.log('state.loggedInUser ',state.loggedInUser)
    console.log(`state.users `, state.users )
   const [books, setbooks] = useState([])
    useEffect(() => {
   /*       axios.get("http://localhost:5000/books")
        .then((res:any)=>setbooks(res.data))
        .catch((err)=>console.log(err.message))   */
        setbooks(state.books)

    },[])
   /* useEffect(() => {
        console.log(dataTosearch)
        let searchBy=dataTosearch.searchBy
        let searchText=dataTosearch.searchText
            switch (searchBy) {
                case 'id': axios.get("http://localhost:5000/books/"+searchText)
                            .then((res:any)=>setbooks(res.data))
                            .catch((err)=>console.log(err.message))
                          break;
                case 'author':axios.get("http://localhost:5000/books/by/"+searchText)
                                .then((res:any)=>setbooks(res.data))
                                .catch((err)=>console.log(err.message))
                                break;
                case 'rating': axios.get("http://localhost:5000/books/with-min-rating/"+searchText)
                                 .then((res:any)=>setbooks(res.data))
                                 .catch((err)=>console.log(err.message)) 
                       break;
                case 'price':const [minPrice,maxPrice]=searchText.split('-')
                            axios.get("http://localhost:5000/books/priced/"+minPrice+"/"+maxPrice)
                                .then((res:any)=>setbooks(res.data))
                                .catch((err)=>console.log(err.message))
                    break; 
            }
            if(searchText===''){
                axios.get("http://localhost:5000/books")
                .then((res:any)=>setbooks(res.data))
                .catch((err)=>console.log(err.message))
            }   
    },[dataTosearch])
 */
    useEffect(() => {
        setbooks(searchBooks(state.books,state.dataToSearch.searchBy,state.dataToSearch.searchText))
    }, [state.dataToSearch])
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
        <Link to={`/bookDetails/${book.id}`}>
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




