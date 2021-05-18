import axios from "axios";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { deleteBookFromDB, getAllBooks } from "../../services/AxiosHandler";
import StarRating from "../starRating";

interface Props {
  book: any;
}

export default function SingleBook({ book }: Props): ReactElement {
    console.log('book from single book ',book)
  const { state, dispatch } = useContext(UserContext);
  const [dispalyDeleteButton, setdeleteButton] = useState(false);
  let history = useHistory();
  useEffect(() => {
    if (state.token != "") {
      setdeleteButton(true);
    }
  });
  const deleteBook = () => {
    deleteBookFromDB(book._id,state.token)
    .then((res)=>{
      getAllBooks().then((res) => {
        dispatch({ type: "BOOKS_ALL_BOOKS", books: res });
      });
    })
    .catch((err)=>console.log(err.message))
    history.push("/");
  };
  return (
    <>
      <div
        className="card mb-3"
        style={{ width: "1200px", height: "800px", margin: "2vw 4vw 4vw 6vw" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              style={{
                maxWidth: "350px",
                margin: "2vw",
                marginTop: "3vw",
                boxShadow: "15px 15px 15px gray",
              }}
              src={book.cover}
              alt="Book Cover Image"
              className="img-fluid"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <p className="card-text">
                <StarRating rating={book.rating}></StarRating>
              </p>
              <p className="card-text">
                <i className="fa fa-inr" aria-hidden="true"></i>{" "}
                <b>{book.price}</b>
              </p>
              <p
                className="card-text"
                style={{
                  textAlign: "justify",
                  marginLeft: "0vw",
                  overflow: "hidden",
                }}
              >
                {book.description}
              </p>
              {dispalyDeleteButton ? (
                <p className="card-text">
                  <button
                    style={{ marginTop: "2vw" }}
                    className="btn btn-dark"
                    onClick={deleteBook}
                  >
                    DELETE BOOK
                  </button>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
