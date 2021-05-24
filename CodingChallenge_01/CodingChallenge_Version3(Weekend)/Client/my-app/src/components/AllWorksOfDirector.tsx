import React, { ReactElement, useContext, useEffect, useState } from "react";
import {UserContext} from "../Context/UserContext";
import { allDirectorsOfMovie, allWorksOfDirector, getAllDirectors } from "../services/AxiosHandler";
import { MyVerticallyCenteredModal } from "./Modal";

interface Props {}

export default function AllWorksOfDirector({}: Props): ReactElement {

  const {state,dispatch} = useContext(UserContext)

  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [showAlert, setshowAlert] = useState(false);
  const [movieList, setmovieList] = useState([{}]);


  const captureDirector=(e:any)=>{
      let directorName=e.target.innerText;
      console.log(directorName)
      allWorksOfDirector(directorName)
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
        if(err.response){
          setmodalMessage(err.response.data.message)
          return 
        }
        setmodalMessage(err.message)
    })
  }
  useEffect(() => {
    getAllDirectors()
    .then((res)=>{
        if(res.data.success===true){
            dispatch({type:'ALL_DIRECTORS',directors:res.data.allDirectors})
        }
        else{
            console.log(res.data.message)
        }
    })
    .catch((err:any)=>{
        console.log(err.message)
    })
  }, [state.directors])
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
          <div style={{display:'inline-block'}}>
          <table style={{marginLeft:'2vw',width:'15vw'}} className="table">
              <tr>
                <th>Director Name</th>
              </tr>
              {state.directors.map((director:any)=>(
                  <tr>
                    <td  style={{cursor:'pointer'}} onClick={captureDirector}>{director.name}</td> 
                </tr>
              ))}
            </table></div>
          {showAlert ? movieList.length===0? <div className="alert alert-danger" style={{textAlign:'center',display:'inline-block',position:'fixed',top:'30%',left:'40%'}} role="alert">
            No Movies For the this Director
         </div>: ( 
              <div style={{display:'inline-block',position:'fixed',top:'10%',left:'30%'}}>
            <table style={{marginTop:'3vw',marginLeft:'3vw'}} className='table'>
            <tr><th>Name</th>
            <th>Rating</th>
            <th>Collection</th>
            <th>Directors</th>
              </tr>
            {movieList.map((movie:any)=><tr>
                <td>{movie.name}</td>
                <td>{movie.rating}</td>
                <td>{movie.boxOfficeCollection}</td>
                <td>
                  <ul style={{listStyleType:'none'}}>{movie.directors!==undefined?movie.directors.map((d:any)=><li>{d}</li>):null}</ul>
                  </td>
                </tr>)}
        </table></div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
