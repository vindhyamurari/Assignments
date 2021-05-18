import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

interface Props {}

export default function Header({}: Props): ReactElement {
  const { state, dispatch } = useContext(UserContext);

  const [searchInput, setsearchInput] = useState("");
  const [searchBy, setsearchBy] = useState("");
  const [showAddButton, setshowAddButton] = useState(false);

  const selection = (e: any) => {
    setsearchBy(e.target?.value);
  };

  const inputEvent = (e: any) => {
    let inp = e.target?.value;
    setsearchInput(inp);
  };
  const submitSearchData = () => {
    console.log(`searchBy `, searchBy)
    console.log(`searchInput `, searchInput )
    dispatch({
      type: "SEARCH_DATA",
      dataToSearch: { searchBy: searchBy, searchText: searchInput },
    });
  };

  useEffect(() => {
    if (state.token != "") {
      setshowAddButton(true);
    } else {
      setshowAddButton(false);
    }
  }, [state.token]);

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER_REMOVE_TOKEN' });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <h2 className="navbar-brand-titleOne" style={{fontFamily: 'Alex Brush',fontSize: '26px'}}>Bookishness</h2>
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
            <select
              id="displayOptions"
              className="btn btn-white"
              onClick={selection}
              style={{ color: "white" }}
              defaultValue="search"
            >
              <option value="search" disabled>
                Select Search Option
              </option>
              <option value="id" style={{ color: "black" }}>
                Search by ID
              </option>
              <option value="title" style={{ color: "black" }}>
                Search by Title
              </option>
              <option value="author" style={{ color: "black" }}>
                Search by Author
              </option>
              <option value="rating" style={{ color: "black" }}>
                Search by Rating
              </option>
              <option value="price" style={{ color: "black" }}>
                Search by Price
              </option>
            </select>
            <form className="form-inline my-2 my-lg-0">
              <input
                style={{height:'2vw'}}
                className="form-control mr-sm-2"
                id="searchButton"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={inputEvent}
              />
              <button
              style={{height:'2vw',textAlign:'center',paddingBottom:'2vw'}}
                className="btn btn-dark my-2 my-sm-0"
                type="button"
                onClick={submitSearchData}
              >
               <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Books<span className="sr-only">(current)</span>
                </Link>
              </li>
              {showAddButton ? (
                <>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/addBook">
                      Add Books
                    </Link>
                  </li>
                  <li>
                    <button className="btn btn-dark" onClick={logoutUser}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
              {/*  <li className="nav-item active">
            <Link className="nav-link" to="/addAuthor" >Add Author</Link>
            </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
