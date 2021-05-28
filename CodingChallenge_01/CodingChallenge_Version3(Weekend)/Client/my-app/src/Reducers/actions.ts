import { getAllDirectors, getAllMovies } from "../services/AxiosHandler"


export function fetchDirectors(){
    console.log('fetching')
   return function (dispatch:any){
    getAllDirectors()
    .then((res)=>{
        if(res.data.success===true){
            console.log('b4 dispatch')
            dispatch({type:'ALL_DIRECTORS',payload:res.data.allDirectors})
        }
        else{
            console.log(res.data.message)
        }
    })
    .catch((err:any)=>{
        console.log(err.message)
    })
   }
}

export function fetchMovies(){
    return function (dispatch:any){
        getAllMovies()
        .then((res) => {
          if (res.data.success === true) {
            dispatch({ type: "ALL_MOVIES", payload: res.data.allMovies });
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err: any) => {
          console.log(err.message);
        });
    }
}