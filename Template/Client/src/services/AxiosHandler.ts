import axios from "axios";

async function getAll() {
    let response=await axios.get("http://localhost:")
    return response;
}

export {}