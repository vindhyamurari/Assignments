import React, { ReactElement, useContext, useEffect, useState } from "react";
import {UserContext} from "../Context/UserContext";
import { allDirectorsOfMovie, getAllMovies } from "../services/AxiosHandler";
import { MyVerticallyCenteredModal } from "./Modal";

interface Props {}

export default function AllDirectorsOfMovie({}: Props): ReactElement {

    const {state,dispatch} = useContext(UserContext)


  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [showAlert, setshowAlert] = useState(false);
  const [directorList, setDirectorList] = useState([{}]);
useEffect(() => {
    getAllMovies()
    .then((res) => {
      if (res.data.success === true) {
        dispatch({ type: "ALL_MOVIES", movies: res.data.allMovies });
      } else {
        console.log(res.data.message);
      }
    })
    .catch((err: any) => {
      console.log(err.message);
    });
}, [state.movies])
 const captureMovie=(e: any) => {
     let movieName=e.target.innerText;
     console.log(movieName)
     allDirectorsOfMovie(movieName)
       .then((res: any) => {
         if (res.data.success === true) {
           setshowAlert(true);
           setDirectorList(res.data.movieDirectorsDetails);
         } else {
           setModalShow(true);
           setmodalMessage(res.data.message);
         }
       })
       .catch((err: any) => {
         setModalShow(true);
         if (err.response) {
           setmodalMessage(err.response.data.message);
           return;
         }
         setmodalMessage(err.message);
       });
 }
  const submitFormDetails = (e: any) => {
    e.preventDefault();
    
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
          <div style={{ display: "inline-block" }}>
            <table
              style={{ marginLeft: "2vw", width: "15vw" }}
              className="table"
            >
              <tr>
                <th>Movie Name</th>
              </tr>
              {state.movies.map((movie: any) => (
                <tr>
                  <td style={{ cursor: "pointer" }} onClick={captureMovie}>
                    {movie.name}
                  </td>
                </tr>
              ))}
            </table>
          </div>
          {showAlert ? (
            directorList.length === 0 ? (
              <div
                className="alert alert-danger"
                style={{
                  textAlign: "center",
                  display: "inline-block",
                  position: "fixed",
                  top: "30%",
                  left: "20%",
                }}
                role="alert"
              >
                No Director Found
              </div>
            ) : (
              <div
                style={{
                  display: "inline-block",
                  position: "fixed",
                  top: "10%",
                  left: "30%",
                }}
              >
                <table
                  style={{ marginTop: "3vw", marginLeft: "3vw" }}
                  className="table"
                >
                  <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Award Count</th>
              </tr>
                  {directorList.map((director: any) => (
                    <tr>
                    <td>{director.name}</td>  
                    <td>{director.age}</td> 
                    <td>{director.gender}</td> 
                    <td>{director.awardCount}</td> 
                </tr>
                  ))}
                </table>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
