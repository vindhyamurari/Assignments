import React, { ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom';

interface Props {
    
}

export default function Registration({}: Props): ReactElement {

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
        setregister(prevValue => ({ ...prevValue, [name]: value }));
    }
    const submitFormDetails=(e:any)=>{
        e.preventDefault()
        let {name,email,password,confirmpassword}=register
        if(password===confirmpassword){
            let newUser={name,email,password}
            console.log(newUser)
        }
        else{
            alert('Passwords doesnt Match ')
        }
        console.log('n here',register)
        history.push('/')
    }

    return (
        <>
             <form onSubmit={submitFormDetails} className="addBookForm">
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
                </div>
                <div className="submitform">
                <button type="submit" className="btn btn-dark">Submit</button>
                </div>
                </form>
        </>
    )
}
