import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
interface Props {}

export default function Header({}: Props): ReactElement {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="nav navbar-right">
            <ul className="navbar-nav">
              <li className="nav-item active">
              <Link className="nav-link-one" to="/allDirectors">
                  ALL DIRECTORS
                </Link>
                <Link className="nav-link-one" to="/allMovies">
                  ALL MOVIES
                </Link>
                <Link className="nav-link-one" to="/addDirector">
                  ADD DIRECTOR
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link-one" to="/updateDirector">
                  UPDATE DIRECTOR
                </Link>
              </li>
           
              <li className="nav-item active">
                <Link className="nav-link-one" to="/deleteMovie">
                  DELETE MOVIE
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link-one" to="/addMovie">
                  ADD MOVIE
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link-one" to="/allWorksOfDirector">
                  ALL WORKS OF A DIRECTOR
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link-one" to="/allDirectorsOfMovie">
                  ALL DIRECTORS OF A MOVIE
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
