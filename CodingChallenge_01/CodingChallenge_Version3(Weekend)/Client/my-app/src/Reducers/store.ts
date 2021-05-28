import {compose, createStore} from 'redux';
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import {applyMiddleware} from 'redux'

const initialState={};

const store=createStore(rootReducer,initialState,
    compose(
        applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window. __REDUX_DEVTOOLS_EXTENSION__()
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
   );

export default store;