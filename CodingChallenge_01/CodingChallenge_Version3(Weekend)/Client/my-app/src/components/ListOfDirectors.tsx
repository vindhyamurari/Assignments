import axios from 'axios'
import React, { ReactElement, useContext } from 'react'
import {UserContext} from '../Context/UserContext'
import { getAllDirectors } from '../services/AxiosHandler'

interface Props {
    
}

export default function ListOfDirectors({}: Props): ReactElement {
    const {state,dispatch} = useContext(UserContext)
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
    return (
        <div>
            <h5 className="mainHeading">Directors</h5>
             <table className="table">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Award Count</th>
              </tr>
              {state.directors.map((director:any)=>(
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
}
