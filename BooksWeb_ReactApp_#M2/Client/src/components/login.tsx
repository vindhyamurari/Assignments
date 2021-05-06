import React, { ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

interface Props {
    
}

export default function Login({}: Props): ReactElement {

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
        axios.post("http://localhost:5000/users/login",login)
        .then((res)=>{
            console.log(res.data)
            if(res.data.success===true){
                localStorage.setItem('token',res.data.token)
            }
            else{
                alert('Couldnt Sign-in Please Try Again')
            }
        })
        history.push('/')
       
    }

    return (
        <>
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
