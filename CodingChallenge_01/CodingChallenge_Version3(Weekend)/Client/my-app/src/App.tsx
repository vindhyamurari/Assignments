import './styles.css'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from './components/Header'
import AddDirector from './components/AddDirector';
import UpdateDirector from './components/UpdateDirector';
import AddMovie from './components/AddMovie';
import ContextProvider from './Context/UserContext';
import ListOfDirectors from './components/ListOfDirectors';
import ListOfMovies from './components/ListOfMovies';
import DeleteMovie from './components/deleteMovie';
import AllWorksOfDirector from './components/AllWorksOfDirector';
import AllDirectorsOfMovie from './components/AllDirectorsOfMovie';
import {Provider} from 'react-redux'
import store from './Reducers/store'
function App() {
  return (
    <>
    <Provider store={store}> 
    <Router>
     <Header></Header>
     <Switch>
            <Route exact path="/">
              <ListOfDirectors ></ListOfDirectors>
              <ListOfMovies></ListOfMovies>
            </Route>
            <Route exact path="/allDirectors">
            <ListOfDirectors ></ListOfDirectors>
            </Route>
            <Route exact path="/allMovies">
            <ListOfMovies></ListOfMovies>
            </Route>
            <Route exact path="/addDirector">
              <AddDirector></AddDirector>
            </Route>
            <Route exact path="/updateDirector">
              <UpdateDirector></UpdateDirector>
            </Route>
            <Route exact path="/addMovie">
              <AddMovie></AddMovie>
            </Route>
            <Route exact path="/deleteMovie">
              <DeleteMovie></DeleteMovie>
            </Route>
            <Route exact path="/allWorksOfDirector">
              <AllWorksOfDirector></AllWorksOfDirector>
            </Route>
            <Route exact path="/allDirectorsOfMovie">
              <AllDirectorsOfMovie></AllDirectorsOfMovie>
            </Route>
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
