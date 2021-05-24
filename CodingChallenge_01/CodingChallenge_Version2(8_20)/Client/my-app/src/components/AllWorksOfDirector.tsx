import axios from 'axios'
import React, { ReactElement, useState } from 'react'
import { MyVerticallyCenteredModal } from './Modal'

interface Props {
    
}

export default function AllWorksOfDirector({}: Props): ReactElement {

    const [directorName, setdirectorName] = useState('')

    const [modalShow, setModalShow] = useState(false)
    const [modalMessage, setmodalMessage] = useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [movieList, setmovieList] = useState([{}])

  const inputEvent = (event: any) => {
    let value = event.target?.value;
    setdirectorName(value);
  };

  const submitFormDetails = (e: any) => {
    e.preventDefault();
    axios.get("http://localhost:5000/director/"+directorName)
    .then((res:any)=>{
        if(res.data.success===true){
            setshowAlert(true)
            setmovieList(res.data.allMoviesOfGivenDirector)
        }
        else{
            setModalShow(true)
            setmodalMessage(res.data.message)
        }
    })
    .catch((err:any)=>{
        setModalShow(true)
        setmodalMessage(err.message)
    })
  };
    return (
        <div>
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
      {showAlert?
      <table className='table'>
          <tr><th>Name</th>
          <th>Rating</th>
          <th>Collection</th>
          <th>Directors</th>
            </tr>
          {movieList.map((movie:any)=><tr>
              <td>{movie.name}</td>
              <td>{movie.rating}</td>
              <td>{movie.boxOfficeCollection}</td>
              <td>{movie.directors}</td>
              </tr>)}

      </table>
      
         :
             <form onSubmit={submitFormDetails} className="registrationForm">
        <div className="form-group">
          <label htmlFor="name">Director Name</label>
          <input
            type="text"
            className="form-control"
            autoComplete="true"
            name="name"
            onChange={inputEvent}
            placeholder="Director Name"
            required
          />
        </div>
        <div className="submitform">
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </div>
      </form>
        }
        </div>
        </div>
        </div>
    )
}
