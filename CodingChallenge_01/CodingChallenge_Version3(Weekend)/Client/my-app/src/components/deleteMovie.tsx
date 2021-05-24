import axios from 'axios';
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import {UserContext} from '../Context/UserContext';
import { deleteMovie, getAllMovies } from '../services/AxiosHandler';
import { MyVerticallyCenteredModal } from './Modal';

interface Props {
    
}

export default function DeleteMovie({}: Props): ReactElement {

    const {state,dispatch} = useContext(UserContext)

    const [movieName, setmovieName] = useState('')

    const [modalShow, setModalShow] = useState(false)
    const [modalMessage, setmodalMessage] = useState('')
    const [showAlert, setshowAlert] = useState(false)

  const inputEvent = (event: any) => {
    let value = event.target?.value;
    setmovieName(value);
  };

  const captureMovie=(e:any)=>{
      console.log(`e.target`, e.target)
       let parent=e.target.parentElement;
       console.log(parent)
      let children=parent.children;
      console.log(children) 
      let movieName=children[0].innerText
      deleteMovie(movieName)
      .then((res:any)=>{
          if(res.data.success===true){
              setshowAlert(true)
          }
          else{
              setModalShow(true)
              setmodalMessage(res.data.message)
          }
      })
      .catch((err:any)=>{
          setModalShow(true)
          if(err.response){
            setmodalMessage(err.response.data.message)
            return 
          }
          setmodalMessage(err.message)
      })
  }
  useEffect(() => {
    getAllMovies()
    .then((res) => {
      if (res.data.success === true) {
        dispatch({ type: "ALL_MOVIES", movies: res.data.allMovies });
      } else {
        console.log(res.data.message);
      }
    })
  }, [state.movies])

    return (
        <div>
             <div>
            <MyVerticallyCenteredModal
        header="Failed"
        body={modalMessage}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        //  history.push("/");
        }}
      /> 
      {/* {showAlert?<><div className="alert alert-danger" style={{textAlign:'center'}} role="alert">
       Movie Deleted Successfully !
         </div> <ListOfMovies></ListOfMovies></>:
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
}*/}
         <table className="table">
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Collection</th>
          <th>Directors</th>
          <th>Action</th>
        </tr>
        {state.movies.map((movie: any) => (
          <tr>
            <td>{movie.name}</td>
            <td>{movie.rating}</td>
            <td>{movie.boxOfficeCollection}</td>
            <td><ul  style={{listStyleType:'none'}}>{ movie.directors.map((director:any)=><li>{director}</li>)}</ul></td>
            <td onClick={captureMovie} style={{cursor:'pointer'}}><i className="fa fa-trash-o" aria-hidden="true"></i></td>
          </tr>
        ))}
      </table>
        </div>
        </div> 
    )
}
