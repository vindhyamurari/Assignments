export default function Reducer(state:any,action:any){
    switch(action.type){
        case 'BOOKS_ALL_BOOKS':
            return {...state,books:action.books}
        case 'SEARCH_DATA':
            return {...state,dataToSearch:action.dataToSearch}
        case 'BOOKS_SEARCH_BOOKS':
            return {...state,searchedBooks:action.searchedBooks}
        case 'BOOKS_BOOK_BY_ID':
            return {...state,singleBookDetails:action.singleBook}
        case 'LOGIN_USER_SEND_OTP':
            return {...state, otpVerificationData:action.userData}
        case 'LOGIN_USER_ADD_TOKEN':
            return {...state,token:action.token}
        case 'LOGOUT_USER_REMOVE_TOKEN':
            return {...state,token:''}
        default:
            return state;
    }
}