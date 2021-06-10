import * as Constants from './constants';

const initalstate={
    loggedInUser:{
        _id: "60bfb47c4039de6844ff8b86",
        username: "Pumpkin",
        name: "Jack",
        email: "jack@gmail.com",
        password: "$2b$10$TPIyUT40D6BJsuleTGkFJOottYiUc16LPqu1RKAxF2WkEHScDXiI2",
        phone: "9876543210"
    },
    token:'token'
}

const userReducer =(state:any=initalstate,action:any)=>{
    switch(action.type){
        case Constants.USER_LOGIN:
            return {...state/* ,token:action.payload.token,loggedInUser:action.payload.user */}
        case Constants.USER_LOGOUT:
            return {...state,token:'',loggedInUser:{}}
        default:
            return state;
    }
}

export default userReducer;