import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from './StarRating'

interface Props {
    movies:any
}

export default function MovieThumbnail({movies}: Props): ReactElement {
    return (
        <>
        {movies.map((movie:any)=>
        <div className="col">
        <div className="card" style={{display:'inline-block'}}>
        <Link to={`/movies/${movie.imdbID}`} style={{textDecoration:'none'}}>
        <img className="card-img-top" src={movie.Poster} alt="Card image cap"/>
        <div className="card-body">
          <h6 className="card-title">{movie.Title}</h6>
          <span className="card-text span-text">
           Released:<b>{movie.Released}</b>
          </span><br/>
          <span className="card-text span-text" style={{paddingLeft:'20px'}}>
           Votes: <b>{movie.imdbVotes}</b>
          </span><br/>
          <span className="card-text span-text" style={{paddingLeft:'35px'}}>
           <StarRating rating={movie.imdbRating} limit={10}></StarRating>
          </span>    
        </div>
        </Link>
      </div>
      </div>
      
      )}
       </>
       
    )
}
