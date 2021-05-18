import React, { useReducer } from 'react';
import Reducer from '../Reducer/Reducer'
 
const UserContext=React.createContext<any>({})

const ContextProvider=(props:any)=>{
    const [state, dispatch] = useReducer(Reducer, {
        books:[],
        searchedBooks:[],
        singleBookDetails:{},
        dataToSearch:{
            searchBy:'',
            searchText:''
        } ,
        loggedInUser:
        {
            email:'',
            token:''
        },
        token:'',
        otpVerificationData:''
    } )
    return (
        <UserContext.Provider value={{state,dispatch}}>
           {props.children} 
        </UserContext.Provider>
    )
}

export {UserContext,ContextProvider}
