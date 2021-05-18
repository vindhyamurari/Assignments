import axios from 'axios'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Link, Redirect, useHistory, useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import StarRating from './starRating'

interface Props {
  bookId?:number
} 
interface MatchParams{
  paramId:string
} 

export default function BookDetails({bookId}: Props): ReactElement {

  const {state,dispatch} = useContext(UserContext)
  
  const [dispalyDeleteButton, setdeleteButton] = useState(false)
  const {paramId}=useParams<MatchParams>();
  const id=bookId!==undefined?bookId:paramId
  
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
    console.log(state.books)

   useEffect(()=>{
       /*  axios.get("http://localhost:5000/books/"+id)
          .then((res)=>setbook(res.data))
          .catch((err)=>console.log(err.message)) */
          setbook(state.books.find((b:any)=>b.id===Number(id)))
    },[])

    useEffect(()=>{
      if(state.loggedInUser.token!=''){
        setdeleteButton(true)
      }
    })  

    const deleteBook=()=>{
      /* if(localStorage.getItem('token')){
      axios.delete("http://localhost:5000/books/"+id,{
        headers: {
          "Authorization":`${localStorage.getItem('token')}`
       }
      }).then((res)=>console.log(res.data)).catch((err)=>console.log(err.message))
      }
      else{
        alert('Please Sign-in to Delete Book')
      } */
     dispatch({type:'REMOVE_BOOK',id:Number(id)})
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
        </p>{dispalyDeleteButton?<p className="card-text">
          <button style={{marginTop:"2vw"}} className="btn btn-dark" onClick={deleteBook}>DELETE BOOK</button>
        </p>:null}
      </div>
    </div>
  </div>
</div>
</>
    )
}
