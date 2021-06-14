import React, { ReactElement,useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AxiosHandler from '../services/AxiosHandler';
import * as Constants from '../Reducers/constants'
import { MyVerticallyCenteredModal } from './Modal';
import { useHistory } from 'react-router';
import MovieThumbnail from './MovieThumbnail'
interface Props {
    
}

export default function UserBookmarkedMovies({}: Props): ReactElement {
    const apiCall=new AxiosHandler();
    const dispatch=useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const [modalMessage, setmodalMessage] = useState("");
    const history=useHistory();
    const movies=useSelector((state:any)=>state.movies)
    const user=useSelector((state:any)=>state.user)

    useEffect(() => {
        apiCall.getBookmarkedMoviesOfUser(user.loggedInUser._id)
        .then((response:any)=>{
            if(response.data.success===true){
                dispatch({type:Constants.SET_BOOKMARKED_MOVIES,payload:response.data.bookmarkedMovies})
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
          <h5 style={{margin:'2vw 0vw 3vw 23vw'}}>Hello {user.loggedInUser.username} ! Here Are Your Bookedmarked Movies</h5>
       <div className="row">
        <MovieThumbnail movies={movies.bookMarkedMovies}></MovieThumbnail>
       </div>
      </div>
        </>
    )
}
