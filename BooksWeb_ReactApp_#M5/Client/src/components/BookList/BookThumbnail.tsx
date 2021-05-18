import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import StarRating from "../starRating";

interface BookTumbnailProps {
  book: any;
}

function BookThumbnail({ book }: BookTumbnailProps): ReactElement {
  return (
    <Link to={`/bookDetails/${book._id}`}>
      <div className="card">
        <img className="card-img-top" src={book.cover} alt="Card image cap" />
        <div className="card-body">
          <div className="titleHolder">
            <h5 className="card-title">{book.title}</h5>
          </div>
          <p className="card-text">
            <b>{book.author}</b>
          </p>
          <p className="card-text">
            <StarRating rating={book.rating}></StarRating>
          </p>
          <p className="card-text">
            <i className="fa fa-inr" aria-hidden="true"></i> <b>{book.price}</b>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BookThumbnail;