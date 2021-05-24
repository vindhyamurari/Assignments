import './styles.css'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from './components/Header'
import AddDirector from './components/AddDirector';
import UpdateDirector from './components/UpdateDirector';
import AddMovie from './components/AddMovie';
import DeleteMovie from './components/deleteMovie';
import AllWorksOfDirector from './components/AllWorksOfDirector';
import React from 'react';
import AllDirectorsOfMovie from './components/AllDirectorsOfMovie';
function App() {
  return (
    <>
    <Router>
     <Header></Header>
     <Switch>
            <Route exact path="/">
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
     
    </>
  );
}

export default App;
