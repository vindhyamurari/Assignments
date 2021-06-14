import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import MovieList from "./components/MovieList";
import OneMovieDetails from "./components/OneMovieDetails";
import Register from "./components/Register";
import SearchedMovies from './components/SearchedMovies';
import UserBookmarkedMovies from './components/UserBookmarkedMovies'

function App() {
  return (
    <>
    <Router>
     <Header></Header>
     <Switch>
            <Route exact path="/">
              <MovieList></MovieList>
            </Route>
            <Route exact path="/search">
              <SearchedMovies></SearchedMovies>
            </Route>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/register">
              <Register></Register>
            </Route>
            <Route exact path="/movies/:imdbID">
              <OneMovieDetails></OneMovieDetails>
            </Route>
            <Route exact path="/bookmarked-movies">
              <UserBookmarkedMovies></UserBookmarkedMovies>
            </Route>
          </Switch>
        </Router>
    </>
  );
}
export default App;
