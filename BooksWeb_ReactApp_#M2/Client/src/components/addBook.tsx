import axios from 'axios';
import React, { ReactElement,useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { addBooksToStorage, fetchFromLocalStorage } from '../utils'

interface Props {
    
}

export default function AddBook({}: Props): ReactElement {
    const [book, setbook] = useState({
        title:'',
        author:'',
        price:0,
        rating:0,
        description:'',
        cover:''
    })
    let history=useHistory();
    const inputEvent=(event:any)=>{
        let value=event.target?.value
        let name=event.target?.name 
        setbook(prevbook => ({ ...prevbook, [name]: value }));
    }
    const submitFormDetails=(e:any)=>{
        if(localStorage.getItem('token')){
            axios.post('http://localhost:5000/books',book,
            {
                headers: {
                    "Authorization":`${localStorage.getItem('token')}`
                }
            }).then((res)=>console.log(res.data))
            .catch((err)=>console.log(err.message))
        }
        else{
            alert('Please Sign-in to Add Book')
        }
        history.push('/')
    }
    return (
        <>
            <h4 className='title'>Add A New Book</h4>
            <form onSubmit={submitFormDetails} className="addBookForm">
                <div className="form-group">
                    <label htmlFor="name">Title</label>
                    <input type="text" className="form-control" name="title" onChange={inputEvent} id="formGroupExampleInput" placeholder="book title" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" className="form-control" name="author" onChange={inputEvent} id="author" placeholder="book author" required/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Description Of the Book</label>
                    <textarea className="form-control" name="description" onChange={inputEvent} id="description" rows={2} placeholder="about the book" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="cover">Cover</label>
                    <input type="text" className="form-control" name="cover" onChange={inputEvent} id="formGroupExampleInput" placeholder="cover url" required/>
                </div>
                <div className="form-row">
                <div className="col">
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" name="price" onChange={inputEvent} placeholder="price" required/>
                    </div>
                    <div className="col">
                    <label htmlFor="rating">Rating</label>
                     <input type="number" className="form-control" name="rating" step="0.1" onChange={inputEvent} placeholder="rating" required/>
                    </div>
                </div>
                <div className="submitform">
                <button type="submit" className="btn btn-dark">Submit</button>
                </div>
                </form>
        </>
    )
}

