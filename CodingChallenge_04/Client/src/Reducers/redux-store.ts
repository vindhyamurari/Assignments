import {compose, createStore} from 'redux';
import {combineReducers} from 'redux'
import userReducer from './user-reducer';
import movieReducer from './movie-reducer';

const initialState={};

const reducers=combineReducers({
        user: userReducer,
        movies: movieReducer,
    });

const store=createStore(reducers,initialState,
    compose(
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
   );

export default store;