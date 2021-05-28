import React, { ReactElement, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { UserContext } from "../Context/UserContext";
import { fetchMovies } from "../Reducers/actions";
import { getAllMovies } from "../services/AxiosHandler";

interface Props {
  listOfMovies:any
}

function ListOfMovies({listOfMovies}: Props): ReactElement {

  useEffect(() => {
   fetchMovies()
  })
  return (
    <div>
      <h5 className="mainHeading">Movies</h5>
      <table className="table">
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Collection</th>
          <th>Directors</th>
        </tr>
        {listOfMovies.map((movie: any) => (
          <tr>
            <td>{movie.name}</td>
            <td>{movie.rating}</td>
            <td>{movie.boxOfficeCollection}</td>
            <td><ul  style={{listStyleType:'none'}}>{ movie.directors.map((director:any)=><li>{director}</li>)}</ul></td>
          </tr>
        ))}
      </table>
    </div>
  );
}

function mapStateToProps(state:any) {
  return { listOfMovies:state.items.movies };
}

export default connect(mapStateToProps,fetchMovies)(ListOfMovies)
