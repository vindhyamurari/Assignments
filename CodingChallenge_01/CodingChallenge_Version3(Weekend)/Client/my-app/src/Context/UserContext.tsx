import { createContext, useReducer } from "react";
import Reducer from "../Reducers/Reducer";

export const UserContext:any=createContext<any>({})

const ContextProvider=(props: any)=>{
    const [state, dispatch] = useReducer(Reducer, {
        directors:[],
        movies:[],
        director:''
    })
    return (
        <div>
            <UserContext.Provider value={{state,dispatch}}>
                {props.children}
            </UserContext.Provider>
        </div>
    )
}
export default ContextProvider;
