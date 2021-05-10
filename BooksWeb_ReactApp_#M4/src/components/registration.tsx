import axios from 'axios';
import React, { ReactElement, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { MyVerticallyCenteredModal } from './PopUp';

interface Props {
    
}

export default function Registration({}: Props): ReactElement {

    const {dispatch} = useContext(UserContext)
    const [modalShow, setModalShow] = React.useState(false);

    const [passwordMatch, setpasswordMatch] = useState('')
    const [register, setregister] = useState({
        name:'',
        email:'',
        password:'',
        confirmpassword:''
    })

    let history=useHistory();

    const inputEvent=(event:any)=>{
        let value=event.target?.value
        let name=event.target?.name 
        if(name==='confirmpassword'){
            if(!(register.password===value)){
                setpasswordMatch('Passwords does not Match')
            } 
            else{
                setpasswordMatch('')
            }
        }
        setregister(prevValue => ({ ...prevValue, [name]: value }));
    }
    const submitFormDetails=(e:any)=>{
        e.preventDefault()
        let {name,email,password}=register
        if(passwordMatch===''){
            let newUser={name,email,password}
            dispatch({type:'REGISTER_USER',user:newUser})
        } 
        else{
            setModalShow(true)
        }
       
    }

    return (
        <>
         <MyVerticallyCenteredModal header='Registration Failed' body='Please enter the valid details for Registation'
              show={modalShow}
              onHide={() => {setModalShow(false);history.push('/')}}
            />
             <form onSubmit={submitFormDetails} className="registrationForm">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" autoComplete='true' name="name" onChange={inputEvent}  placeholder="User Name" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">Email-id</label>
                    <input type="email" className="form-control" name="email" onChange={inputEvent}  placeholder="email-id" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">Password</label>
                    <input type="password" className="form-control" name="password" onChange={inputEvent}  placeholder="enter password" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">Confirm Password</label>
                    <input type="password" className="form-control" name="confirmpassword" onChange={inputEvent}  placeholder="retype password" required/>
                    <p style={{color:'red',marginLeft:'11vw',marginTop:'1vw'}}> {passwordMatch}</p>
                </div>
                <div className="submitform">
                <button type="submit" className="btn btn-dark">Submit</button>
                </div>
                </form>
               
        </>
    )
}
