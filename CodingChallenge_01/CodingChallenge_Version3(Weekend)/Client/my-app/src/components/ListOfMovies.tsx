import React, { ReactElement, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { getAllMovies } from "../services/AxiosHandler";

interface Props {}

export default function ListOfMovies({}: Props): ReactElement {
  const { state, dispatch } = useContext(UserContext);
  getAllMovies()
    .then((res) => {
      if (res.data.success === true) {
        dispatch({ type: "ALL_MOVIES", movies: res.data.allMovies });
      } else {
        console.log(res.data.message);
      }
    })
    .catch((err: any) => {
      console.log(err.message);
    });
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
        {state.movies.map((movie: any) => (
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
