import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddAnswer from "./components/AddAnswer";
import AddQuestion from "./components/AddQuestion";
import Header from "./components/Header";
import Login from "./components/Login";
import Questions from "./components/Questions";
import Registration from "./components/Register";
import ContextProvider from "./Context/UserContext";

function App() {
  return (
    <>
      <ContextProvider>
        <Router>
          <Header></Header>

          <Switch>
            <Route exact path="/">
              <Questions></Questions>
            </Route>
            <Route exact path="/register">
              <Registration></Registration>
            </Route>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/addQuestion">
              <AddQuestion></AddQuestion>
            </Route>
            <Route exact path="/showAnswer/:questionId">
              <AddAnswer></AddAnswer>
            </Route>
          </Switch>
        </Router>
      </ContextProvider>
    </>
  );
}

export default App;
