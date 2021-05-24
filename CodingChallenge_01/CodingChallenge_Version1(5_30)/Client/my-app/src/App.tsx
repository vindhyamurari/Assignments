import './styles.css'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from './components/Header'
import AddDirector from './components/AddDirector';
import UpdateDirector from './components/UpdateDirector';
import AddMovie from './components/AddMovie';
import DeleteMovie from './components/deleteMovie';
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
          </Switch>
        </Router>
     
    </>
  );
}

export default App;
