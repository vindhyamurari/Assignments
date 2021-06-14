import React, { ReactElement,useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AxiosHandler from '../services/AxiosHandler';
import * as Constants from '../Reducers/constants'
import { MyVerticallyCenteredModal } from './Modal';
import { useHistory, useLocation } from 'react-router';
import MovieThumbnail from './MovieThumbnail'
import CircularProgress from '@material-ui/core/CircularProgress';



interface Props {
    
}

export default function SearchedMovies({}: Props): ReactElement {
    const apiCall=new AxiosHandler();
    const dispatch=useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const [modalMessage, setmodalMessage] = useState("");
    const [searchByImdb, setsearchByImdb] = useState(false)
    const history=useHistory();
    const movies=useSelector((state:any)=>state.movies)

    let {search} =useLocation();//q=galaxy&p=100
    console.log(`search`, search)
    const searchParam=new URLSearchParams(search);
    const searchText=searchParam.get('q')
    console.log(`searchText`, searchText)
    console.log(`movies`, movies)
    
    useEffect(() => {
                apiCall.getMovieBySearch(searchText)
                .then((response:any)=>{
                    if(response.data.success===true){
                        console.log(`response.data.searchedMovies`, response.data.searchedMovies)
                        dispatch({type:Constants.SET_SEARCHED_MOVIES_TEXT,payload:response.data.searchedMovies})
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
    },[searchText])
    return (
        <>
        <MyVerticallyCenteredModal
        header="Error"
        body={modalMessage}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          history.push("/");
        }}
      />
      <div className="container" style={{marginTop:'3vw'}}>
      <div className="row">
        {movies.searchedMovies===[]?  <CircularProgress />:
          <MovieThumbnail movies={movies.searchedMoviesByText}></MovieThumbnail>
        } 
      </div>
      </div>
        </>
    )
}
