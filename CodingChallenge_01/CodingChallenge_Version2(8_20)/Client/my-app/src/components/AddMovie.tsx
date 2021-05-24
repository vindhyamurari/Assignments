import axios from 'axios'
import React, { ReactElement, useState } from 'react'
import { MyVerticallyCenteredModal } from './Modal'

interface Props {
    
}

export default function AddMovie({}: Props): ReactElement {
    const [movieDetails, setmovieDetails] = useState({
        name:"",
        movieId:0,
        boxOfficeCollection:0,
        rating:0,
        directors:''
    })
    const [modalShow, setModalShow] = useState(false)
    const [modalMessage, setmodalMessage] = useState('')
    const [showAlert, setshowAlert] = useState(false)

  const inputEvent = (event: any) => {
    let value = event.target?.value;
    let name = event.target?.name;
    setmovieDetails((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const submitFormDetails = (e: any) => {
   e.preventDefault();
    let directors=movieDetails.directors.split(',');
    let newMovie={...movieDetails,directors}
     axios.post("http://localhost:5000/movies",newMovie)
    .then((res)=>{
        if(res.data.success===true){
            setshowAlert(true)
        }
        else{
            setModalShow(true)
            setmodalMessage(res.data.message)
        }
    })
    .catch((err)=>{
        setModalShow(true)
        setmodalMessage(err.message)
    })  
  };

    return (
        <div>
             <div>
            <MyVerticallyCenteredModal
        header="Failed"
        body={modalMessage}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
         // history.push("/addDirector");
        }}
      /> 
      {showAlert?<div className="alert alert-success" style={{textAlign:'center'}} role="alert">
       New Movie Added Successfully !
         </div>:null}
             <form onSubmit={submitFormDetails} className="registrationForm">
        <div className="form-group">
          <label htmlFor="name">Movie Name</label>
          <input
            type="text"
            className="form-control"
            autoComplete="true"
            name="name"
            onChange={inputEvent}
            placeholder="Movie Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Movie Id</label>
          <input
            type="number"
            className="form-control"
            name="movieId"
            onChange={inputEvent}
            placeholder="movie id"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Box Office Collection</label>
          <input
            type="number"
            className="form-control"
            name="boxOfficeCollection"
            onChange={inputEvent}
            placeholder="Box Office Collection"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Rating</label>
          <input
            type="number"
            className="form-control"
            name="rating"
            step={0.1}
            onChange={inputEvent}
            placeholder="rating"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Directors</label>
          <input
            type="text"
            className="form-control"
            name="directors"
            onChange={inputEvent}
            placeholder="enter comma seperated values"
            required
          />
        </div>
        <div className="submitform">
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </div>
      </form>
        </div>
    </div>
    
    )
}
