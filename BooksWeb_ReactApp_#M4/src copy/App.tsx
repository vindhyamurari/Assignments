import { ReactElement} from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddBook from "./components/addBook";
import BookDetails from "./components/bookDetails";
import Header from "./components/header";
import Table from "./components/Table";
import Register from "./components/registration";
import Login from "./components/login";
import { ContextProvider } from "./UserContext";


interface Props {}

export default function App({}: Props): ReactElement {

  return (
    <div>
      <ContextProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Table ></Table>
            </Route>
            <Route exact path="/addBook">
              <AddBook></AddBook>
            </Route>
            <Route exact path="/bookDetails/:paramId">
              <BookDetails></BookDetails>
            </Route>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/register">
              <Register></Register>
            </Route>
          </Switch>
        </Router>
      </ContextProvider>
    </div>
  );
}
