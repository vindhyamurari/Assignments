import axios from "axios";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import {UserContext} from "../Context/UserContext";
import { MyVerticallyCenteredModal } from "./Modal";

interface Props {}

export default function UpdateDirectorIcon({}: Props): ReactElement {
  const {state,dispatch} = useContext(UserContext)

  const [updateDetails, setdirectorDetails] = useState({
    name: "",
    age: 0,
    awardCount: 0,
  });
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [showAlert, setshowAlert] = useState(false);

  const inputEvent = (event: any) => {
    let value = event.target?.value;
    let name = event.target?.name;
    setdirectorDetails((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const submitFormDetails = (e: any) => {
    e.preventDefault();
    console.log(updateDetails);
    let {name}=updateDetails;
    let updatedDirector={age:updateDetails.age,awardCount:updateDetails.awardCount}
    axios
      .patch("http://localhost:5000/director/"+name,updatedDirector)
      .then((res) => {
        if (res.data.success === true) {
          setshowAlert(true);
          dispatch({type:'SET_DIRECTOR',director:res.data.newDetails})
        } else {
          setModalShow(true);
          setmodalMessage(res.data.message);
        }
      })
      .catch((err) => {
        setModalShow(true);
        if(err.response){
          setmodalMessage(err.response.data.message)
          return
        }
        setmodalMessage(err.message);
      }); 
  };

  return (
    <>
      <div>
        <MyVerticallyCenteredModal
          header="Failed"
          body={modalMessage}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
        />
        {showAlert ? (
          <>
          <div
            className="alert alert-success"
            style={{ textAlign: "center"}}
            role="alert"
          >
            Director Details Updated Successfully !
          </div>
          <table className="table">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Award Count</th>
              </tr>
            {<tr>
                    <td>{state.director.name}</td>  
                    <td>{state.director.age}</td> 
                    <td>{state.director.gender}</td> 
                    <td>{state.director.awardCount}</td> 
                </tr>}
            </table>
         </>
        ) :
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
          <div className="form-group">
            <label htmlFor="author">Age</label>
            <input
              type="number"
              className="form-control"
              name="age"
              onChange={inputEvent}
              placeholder="age"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Award Count</label>
            <input
              type="number"
              className="form-control"
              name="awardCount"
              onChange={inputEvent}
              placeholder="award Count"
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
    </>
  );
}
