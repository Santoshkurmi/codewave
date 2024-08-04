import axios from "axios";
import { getToken } from "./tokens";


const api = axios.create(
    {
        baseURL:"http://localhost:8000/api/v1",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+getToken()
        },
    }
);


export default api;