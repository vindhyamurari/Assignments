import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
interface Props {}

export default function Header({}: Props): ReactElement {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <h4 className="navbar-brand-titleOne">Movies</h4>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="nav navbar-right">
            <ul className="navbar-nav">
              <li className="nav-item active">
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
