import axios from 'axios'
import React, { ReactElement, useState } from 'react'
import { MyVerticallyCenteredModal } from './Modal'

interface Props {
    
}

export default function AllDirectorsOfMovie({}: Props): ReactElement {

    const [movieName, setmovieName] = useState('')

    const [modalShow, setModalShow] = useState(false)
    const [modalMessage, setmodalMessage] = useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [movieList, setmovieList] = useState([{}])

  const inputEvent = (event: any) => {
    let value = event.target?.value;
    setmovieName(value);
  };

  const submitFormDetails = (e: any) => {
    e.preventDefault();
    axios.get("http://localhost:5000/movie/"+movieName)
    .then((res:any)=>{
        if(res.data.success===true){
            setshowAlert(true)
            setmovieList(res.data.movieDirectorsDetails)
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
          <th>Age</th>
          <th>Gender</th>
          <th>Award Count</th>
            </tr>
          {movieList.map((director:any)=><tr>
              <td>{director.name}</td>
              <td>{director.age}</td>
              <td>{director.gender}</td>
              <td>{director.awardCount}</td>
              </tr>)}

      </table>
      
         :
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
