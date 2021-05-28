import axios from 'axios'
import React, { ReactElement, useContext, useEffect } from 'react'
import {UserContext} from '../Context/UserContext'
import { getAllDirectors } from '../services/AxiosHandler'
import {connect} from 'react-redux'
import {fetchDirectors} from '../Reducers/actions'

interface Props {
    listOfdirectors:any
}

function ListOfDirectors({listOfdirectors}:Props): ReactElement {
    console.log('object')
    useEffect(() => {
       fetchDirectors()
    })
//    console.log('here',props.listOfdirectors)
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
              { listOfdirectors.map((director:any)=>(
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


function mapStateToProps(state:any) {
    return { listOfdirectors:state.items.directors };
  }

export default connect(mapStateToProps,fetchDirectors)(ListOfDirectors)