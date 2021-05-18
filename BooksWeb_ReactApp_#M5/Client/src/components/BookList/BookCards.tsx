import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import StarRating from "../starRating";
import { UserContext } from "../../Context/UserContext";
import { getAllBooks, getBooksBySearch } from "../../services/AxiosHandler";
import SingleBook from "../BookDetails/singleBook";
import Cards from "./CardDisplay";

interface Props {}

export default function BookCards({}: Props): ReactElement {
  const { state, dispatch } = useContext(UserContext);
  //console.log(`state.token `, state.token )

  useEffect(() => {
    getAllBooks().then((res) => {
      dispatch({ type: "BOOKS_ALL_BOOKS", books: res });
    });
  }, [state]);

  useEffect(() => {
    getBooksBySearch(
      state.dataToSearch.searchBy,
      state.dataToSearch.searchText
    ).then((searchedBooks) => {
      dispatch({ type: "BOOKS_SEARCH_BOOKS", searchedBooks: searchedBooks });
    });
  }, [state.dataToSearch]);

  return (
    <>
      <Cards books={state.dataToSearch.searchText===""?state.books:state.searchedBooks}></Cards>
    </>
  );
}


