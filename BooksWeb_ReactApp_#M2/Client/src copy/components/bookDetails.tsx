import React, { ReactElement, useEffect, useState } from 'react'
import { Link, Redirect, useHistory, useLocation, useParams } from 'react-router-dom'
import {  fetchFromLocalStorage } from '../utils'
import StarRating from './starRating'

 interface Props {
    id:number
} 
/* interface MatchParams{
  id:string
} */

export default function BookDetails({id}: Props): ReactElement {
    // const {id}=useParams<MatchParams>();
/*     const location=useLocation();
    console.log(location.pathname) */
    const [book, setbook] = useState({
        id:0,
        title:'',
        author:'',
        rating:0,
        price:0,
        description:'',
        cover:''
    })
    let history=useHistory()
    useEffect(()=>{
        let books=fetchFromLocalStorage()
        let book=books?.find((b)=>b.id===id)
        console.log(book)
        setbook({...book})
    },[])
    const deleteBook=()=>{
        let books=fetchFromLocalStorage()
        let newBooks=books?.filter((b)=>b.id!==id)
        localStorage.setItem('books', JSON.stringify(newBooks))
        history.push('/')
    }
    return (
        <>
            <div className="card mb-3" style={{width: "1200px",height: "800px",margin:"2vw 4vw 4vw 6vw"}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img style={{maxWidth: "350px",margin:"2vw",marginTop:"3vw",boxShadow:"15px 15px 15px gray"}}
        src={book.cover}
        alt="Book Cover Image"
        className="img-fluid"
      />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h2 className="card-title">{book.title}</h2>
        <p className="card-text">
        <StarRating rating={book.rating}></StarRating>
        </p>
        <p className="card-text">
        <i className="fa fa-inr" aria-hidden="true"></i> <b>{book.price}</b>
        </p>
        <p className="card-text" style={{textAlign:"justify",marginLeft:"0vw",overflow:"hidden"}}>
        {book.description}
        </p>
        <p className="card-text">
          <button style={{marginTop:"2vw"}} className="btn btn-dark" onClick={deleteBook}>DELETE BOOK</button>

        </p>
      </div>
    </div>
  </div>
</div>
</>
    )
}
