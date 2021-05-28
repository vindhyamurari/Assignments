import { createContext, useReducer } from "react";
import Reducer from "../Reducers/Reducer";

export const UserContext:any=createContext<any>({})

const ContextProvider=(props: any)=>{
    const [state, dispatch] = useReducer(Reducer, {
        questions:[],
        selectedQuestions:[],
        token:'',
        answers:[],
        vote:0
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
