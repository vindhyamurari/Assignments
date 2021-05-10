export default function Reducer(state:any,action:any){
    switch(action.type){
        case 'ADD_BOOK':
            return {...state,books:[...state.books,action.book]};
        case 'REMOVE_BOOK':
            return {...state,books:state.books.filter((book:any)=>book.id!==action.id)}
        case 'REGISTER_USER':
            return {...state,users:[...state.users,action.user]}
        case 'LOGIN_USER':
            return {...state,loggedInUser:action.loggedInUser}
        case 'LOGOUT_USER':
            return {...state,loggedInUser:action.logoutUser}
        case 'SEARCH_DATA':
            return {...state,dataToSearch:action.dataToSearch}
        default:
            return state;
    }
}