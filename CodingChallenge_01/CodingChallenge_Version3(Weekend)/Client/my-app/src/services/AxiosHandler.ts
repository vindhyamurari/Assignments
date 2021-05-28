import axios from "axios";

async function getAllDirectors() {
    let response=await axios.get("http://localhost:5000/directors")
    return response;
}

async function getAllMovies() {   
    let response=await axios.get("http://localhost:5000/movies")
    return response;
}

async function addDirector(directorDetails:any) {
    let res=await axios.post("http://localhost:5000/directors",directorDetails)
    return res;
}

async function updateDirector(name:string,updatedDirector:any) {
    let res=await axios.patch("http://localhost:5000/director/"+name,updatedDirector)
    return res;
}

async function deleteMovie(movieName:string) {
    let res=await axios.delete("http://localhost:5000/movie/"+movieName)
    return res;
}

async function addMovie(newMovie:any) {
    let res=await axios.post("http://localhost:5000/movies",newMovie)
    return res;
}

async function allWorksOfDirector(directorName:string) {
    let res=await axios.get("http://localhost:5000/director/"+directorName)
    return res;
}

async function allDirectorsOfMovie(movieName:string) {
    let res=await axios.get("http://localhost:5000/movie/" + movieName)
    return res;
}
export {getAllDirectors,getAllMovies,addDirector,updateDirector,deleteMovie,addMovie,allWorksOfDirector,allDirectorsOfMovie}