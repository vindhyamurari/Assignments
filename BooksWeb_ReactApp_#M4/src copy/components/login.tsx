import React, { ReactElement, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../UserContext';
import jwt from 'jsonwebtoken'
import { MyVerticallyCenteredModal } from './PopUp';



interface Props {
    
}

export default function Login({}: Props): ReactElement {

    const {state,dispatch} = useContext(UserContext)

    const [modalShow, setModalShow] = React.useState(false);
    const [modalMessage, setmodalMessage] = useState('')

    const [login, setlogin] = useState({
        email:'',
        password:''
    })
  

    let history=useHistory();

    const inputEvent=(event:any)=>{
        let value=event.target?.value
        let name=event.target?.name 
        setlogin(prevValue => ({ ...prevValue, [name]: value }));
    }
    const submitFormDetails=(e:any)=>{
        e.preventDefault()
        let foundUser=state.users.find((user:any)=>user.email===login.email)
        if(foundUser){
            if(foundUser.password===login.password){
                const token=jwt.sign({email:foundUser.email},'SecretKey',{expiresIn:'1h'})
                dispatch({type:'LOGIN_USER',loggedInUser:{email:foundUser.email,token:token}})
            }
            else{
                setModalShow(true)
                setmodalMessage('Wrong Password Please Try Again ')
            }
        }
        else{
            setModalShow(true)
            setmodalMessage('User not Found')
        }
       
    }

    return (
        <>
            <MyVerticallyCenteredModal header='Login Failed' body={modalMessage}
              show={modalShow}
              onHide={() => {setModalShow(false);history.push('/')}}
            />
             <form onSubmit={submitFormDetails} className="loginForm">
                <div className="form-group">
                    <label htmlFor="author">Email-id</label>
                    <input type="email" className="form-control" name="email" onChange={inputEvent}  placeholder="email-id" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">Password</label>
                    <input type="password" className="form-control" name="password" onChange={inputEvent}  placeholder="enter password" required/>
                </div>
                <div className="submitform">
                <button type="submit" className="btn btn-dark">Submit</button>
                </div>
                </form>
        </>
    )
}
