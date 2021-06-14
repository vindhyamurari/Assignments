import React, { ReactElement,useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AxiosHandler from '../services/AxiosHandler';
import * as Constants from '../Reducers/constants'
import { MyVerticallyCenteredModal } from './Modal';
import { useHistory } from 'react-router';
import MovieThumbnail from './MovieThumbnail'
interface Props {
    
}

export default function MovieList({}: Props): ReactElement {
    const apiCall=new AxiosHandler();
    const dispatch=useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const [modalMessage, setmodalMessage] = useState("");
    const history=useHistory();
    const movies=useSelector((state:any)=>state.movies)

    useEffect(() => {
        apiCall.getTopRatedMovies()
        .then((response:any)=>{
            if(response.data.success===true){
                dispatch({type:Constants.TOP_RATED_MOVIES,payload:response.data.topRatedMovies})
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

    }, [])
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
        <MovieThumbnail movies={movies.topRatedMovies}></MovieThumbnail>
       </div>
      </div>
        </>
    )
}
