const initalstate={
    directors:[],
    movies:[]
}

const Reducer =(state:any=initalstate,action:any)=>{
    switch(action.type){
        case 'ALL_DIRECTORS':
            return {...state,directors:action.payload}
        case 'ALL_MOVIES':
            return {...state,movies:action.payload}
        case 'RETURN_STATE': 
            return {...state}
        default:
            return state;
        
    }
}

export default Reducer