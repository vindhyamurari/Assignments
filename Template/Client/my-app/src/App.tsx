import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import ContextProvider from "./Context/UserContext";

function App() {
  return (
    <>
       <ContextProvider>
    <Router>
     <Header></Header>
     <Switch>
            <Route exact path="/">
              <h1>Welcome</h1>
            </Route>
          </Switch>
        </Router>
      </ContextProvider>
    </>
  );
}

export default App;
