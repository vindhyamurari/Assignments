import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import AxiosHandler from '../services/AxiosHandler';
import * as Constants from '../Reducers/constants'
import { MyVerticallyCenteredModal } from './Modal';
import { useHistory } from 'react-router';
import BookIcon from '@material-ui/icons/Book';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {

}

interface Matchparams{
    imdbID:any
}

export default function OneMovieDetails({}: Props): ReactElement {

    const {imdbID} = useParams<Matchparams>();
    const apiCall=new AxiosHandler();
    const dispatch=useDispatch();
    const history=useHistory();
    const movies=useSelector((state:any)=>state.movies)
    const [modalShow, setModalShow] = React.useState(false);
    const [modalMessage, setmodalMessage] = useState("");
    const user:any=useSelector((state:any)=>state.user)
    const [userLoggedIn, setuserLoggedIn] = useState(false)
    useEffect(() => {
      if(user.token!==''){
        setuserLoggedIn(true)
      }
      else{
        setuserLoggedIn(false)
      }
    }, [user.token])

    useEffect(() => {
        apiCall.getMovieByIMDB(imdbID)
        .then((response:any)=>{
            if(response.data.success===true){
                dispatch({type:Constants.SET_SEARCHED_MOVIES_IMDB,payload:response.data.movie})
            }
        })
        .catch((err:any)=>{
        setModalShow(true);
                if (err.response) {
                  setmodalMessage(err.response.data.message);
                  return;
                }
            setmodalMessage(err.message);
        })
    }, [imdbID])

    const bookMarkMovie:any=()=>{
      console.log(`imdbId`, imdbID)
      console.log(`user.token`, user.token)
      apiCall.addBookmarkMovie(imdbID,user.token)
        .then((response:any)=>{
          console.log(response.data)
          if(response.data.success===true){
            toast.success('Movie Bookmarked !', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
          else{
            toast.error(response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
        })
        .catch((err:any)=>{
          console.log(`gtng err ${err}`)
            setModalShow(true)
            setmodalMessage(err.message)
        })
    }

    return (
        <>
         <MyVerticallyCenteredModal
        header="Registration Failed"
        body={modalMessage}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          history.push("/");
        }}
      />
     <div className="container" style={{marginTop:'3vw'}}>
      <div className="row">
        <div className="conatiner" style={{marginTop:'3vw'}}>
        <ToastContainer/>
            <div className="row">
                <div className="col-4">
                    <img src={movies.searchedMoviesByImdb.Poster} alt="Movie Poster" style={{borderRadius:'1vw'}}></img>
                </div>
                <div className="col-7" style={{marginTop:'2vw'}}>
                    <h4 style={{marginBottom:'1vw'}}>Title : {movies.searchedMoviesByImdb.Title}</h4>
                    <p>Released On : {movies.searchedMoviesByImdb.Released}</p>
                    <p>Runtime : {movies.searchedMoviesByImdb.Runtime}</p>
                    <p>Genre : {movies.searchedMoviesByImdb.Genre}</p>
                    <p>Country : {movies.searchedMoviesByImdb.Country}</p>
                    <p>Directors : {movies.searchedMoviesByImdb.Director}</p>
                    <p>Actors : {movies.searchedMoviesByImdb.Actor}</p>
                    <p>Writer : {movies.searchedMoviesByImdb.Writer}</p>
                    <p>IMDB Rating : {movies.searchedMoviesByImdb.imdbRating}</p>
                    <p>IMDB Votes : {movies.searchedMoviesByImdb.imdbVotes}</p>
                </div>
                <div className="col-1">
                {userLoggedIn?<span style={{cursor:'pointer'}}><BookIcon fontSize="large" onClick={()=>bookMarkMovie()}/></span>:null} 
                </div>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}
