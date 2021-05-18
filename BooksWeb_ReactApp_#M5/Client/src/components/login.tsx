import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import jwt from "jsonwebtoken";
import { MyVerticallyCenteredModal } from "./PopUp";
import { loginUser, sendPhoneToGetOTP, verifyOTP } from "../services/AxiosHandler";
import { Accordion, Button, Card, Col, Nav, Row, Tab } from "react-bootstrap";

interface Props {}

export default function Login({}: Props): ReactElement {
  const { state, dispatch } = useContext(UserContext);

  const [modalShow, setModalShow] = React.useState(false);
  const [modalMessage, setmodalMessage] = useState("");

  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  const inputEvent = (event: any) => {
    let value = event.target?.value;
    let name = event.target?.name;
    setlogin((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const submitFormDetails = (e: any) => {
    e.preventDefault();
    loginUser(login)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          dispatch({ type: "LOGIN_USER_ADD_TOKEN", token: res.data.token });
          history.push("/");
        } else {
          setModalShow(true);
          setmodalMessage("User not Found");
        }
      })
      .catch((err) => {
        console.log(err.message);
        setModalShow(true);
        setmodalMessage("Couldnt Sign-in Please Try Again");
      });
  };

  const [phone, setphone] = useState('')
  const [showOTPField, setshowOTPField] = useState(false)
  const PhoneInputEvent=(e:any)=>{
    setphone(e.target.value)

  }
  useEffect(() => {
    if(phone.length===10){
      console.log(`phone inside if`, phone)
      sendPhoneToGetOTP(phone)
      .then((res)=>{
        if(res.data.success===true){
          dispatch({ type: "LOGIN_USER_SEND_OTP", userData: res.data.userData });
          setshowOTPField(true)
        }
           else {
              setModalShow(true);
              setmodalMessage(res.data.message);
            }
      })
      .catch((err)=>{
        setModalShow(true);
        setmodalMessage(err.message);
      })
     }
  }, [phone])


  const [otp, setotp] = useState('')
  const OTPInputEvent=(e:any)=>{
    setotp(e.target.value)
  }

    
  useEffect(() => {
    if(otp.length===6){
      verifyOTP(otp,state.otpVerificationData)
      .then((res)=>{
        if (res.data.success === true) {
          dispatch({ type: "LOGIN_USER_ADD_TOKEN", token: res.data.token });
          history.push("/");
        } else {
          setModalShow(true);
          setmodalMessage(res.data.message);
        }
      }).catch((err)=>{
        setModalShow(true);
        setmodalMessage(err.message);
      })
    }
  }, [otp])


  const submitPhoneDetails=()=>{

  }

  return (
    <>
      <MyVerticallyCenteredModal
        header="Login Failed"
        body={modalMessage}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          history.push("/");
        }}
      />

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className="linkOption-one" eventKey="first">
                  Login with email
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="linkOption" eventKey="second">
                  Login with Phone
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <form onSubmit={submitFormDetails} className="loginForm">
                  <div className="form-group">
                    <label htmlFor="author">Email-id</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={inputEvent}
                      placeholder="email-id"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={inputEvent}
                      placeholder="enter password"
                      required
                    />
                  </div>
                  <div className="submitform">
                    <button type="submit" className="btn btn-dark">
                      Submit
                    </button>
                  </div>
                </form>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <form className="loginPhoneForm">
                    {!showOTPField?
                   <div>
                   <div className="form-group">
                   <label htmlFor="author">Phone Number</label>
                   <input
                     type="number"
                     className="form-control"
                     autoComplete="true"
                     autoFocus
                     name="phone"
                     onChange={PhoneInputEvent}
                     placeholder="phone number"
                     required 
                   />
                 </div>
                 {/* <div className="submitform">
                   <button type="submit" className="btn btn-dark">
                     Submit
                   </button>
                 </div> */}
                 </div>:
                   <div className="form-group">
                   <label htmlFor="author">OTP</label>
                   <input
                     type="number"
                     className="form-control"
                     autoComplete="true"
                     name="otp"
                     onChange={OTPInputEvent}
                     placeholder="enter password"
                     required
                   />
                 </div>
                  }
                   
                </form>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}
