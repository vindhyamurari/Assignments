import axios from "axios";
class AxiosHandler {

registerUser = async (newUser: any): Promise<any> => {
    let response = await axios.post(
      "http://localhost:5000/api/users/register",
      newUser
    );
    return response;
  };

  loginUser = async (loginDetails: any): Promise<any> => {
    let response = await axios.post(
      "http://localhost:5000/api/users/login",
      loginDetails
    );
    return response;
  };

  getTopRatedMovies=async (): Promise<any> => {
    let response = await axios.get("http://localhost:5000/api/movies/top-rated-movies");
    return response;
  };

  getMovieByIMDB=async (imdb:any): Promise<any> => {
    let response = await axios.get(`http://localhost:5000/api/movies/imdb-id/${imdb}`);
    return response;
  };
 
  getMovieBySearch=async (text:any): Promise<any> => {
    let response = await axios.get(` http://localhost:5000/api/movies/search/containing/${text}`);
    return response;
  };

  addBookmarkMovie= async (imdbID: any,token:any): Promise<any> => {
    console.log(`imdbID`, imdbID)
    console.log(`token`, token)
    let response = await axios.patch(`http://localhost:5000/api/users/bookmark/imdbID/${imdbID}`,{},
    {
      headers: {
          "Authorization":token
      }
    }
    );
    return response;
  };

  getBookmarkedMoviesOfUser=async (userId:any): Promise<any> => {
    let response = await axios.get(`http://localhost:5000/api/movies/book-marked/by-user/${userId}`);
    return response;
  };
}
export default AxiosHandler;