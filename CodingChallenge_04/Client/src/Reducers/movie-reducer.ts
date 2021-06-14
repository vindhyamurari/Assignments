import * as Constants from './constants';

const initalstate={
    topRatedMovies:[],
    searchedMoviesByText:[],
    searchedMoviesByImdb:{},
    bookMarkedMovies:[]
}

const movieReducer =(state:any=initalstate,action:any)=>{
    switch(action.type){
        case Constants.TOP_RATED_MOVIES:
            return {...state,topRatedMovies:action.payload}
        case Constants.SET_SEARCHED_MOVIES_TEXT:
            return {...state,searchedMoviesByText:action.payload}
        case Constants.SET_SEARCHED_MOVIES_IMDB:
            return {...state,searchedMoviesByImdb:action.payload}
        case Constants.SET_BOOKMARKED_MOVIES:
            return {...state,bookMarkedMovies:action.payload}
        default:
            return state;
    }
}

export default movieReducer;