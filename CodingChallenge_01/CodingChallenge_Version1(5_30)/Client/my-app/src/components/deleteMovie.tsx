import axios from 'axios';
import React, { ReactElement, useState } from 'react'
import { MyVerticallyCenteredModal } from './Modal';

interface Props {
    
}

export default function DeleteMovie({}: Props): ReactElement {

    const [movieName, setmovieName] = useState('')

    const [modalShow, setModalShow] = useState(false)
    const [modalMessage, setmodalMessage] = useState('')
    const [showAlert, setshowAlert] = useState(false)

  const inputEvent = (event: any) => {
    let value = event.target?.value;
    setmovieName(value);
  };

  const submitFormDetails = (e: any) => {
    e.preventDefault();
    console.log(movieName)
    axios.delete("http://localhost:5000/movie/"+movieName)
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
      {showAlert?<div className="alert alert-danger" style={{textAlign:'center'}} role="alert">
       Movie Deleted Successfully !
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
            placeholder="movie Name"
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
