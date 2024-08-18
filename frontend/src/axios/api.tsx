import axios from "axios";
import { getToken } from "./tokens";
import { Zoom, toast } from "react-toastify";
import userStore from "../zustand/UserStore";


const axiosFunc =()=> axios.create(
    {
        baseURL:"http://localhost:8000/api/v1",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+getToken()
        },
    }
);

async function send(path:string,body:any={},method:string|null='POST'){
    // kkk
    // axiosObj().defaults.headers.get['Authorization'] ="mama "+ getToken()?.toString();
    const axiosObj = axiosFunc()
    var data:Record<string,any> = {};
    var errors:Record<string,string>|null = null;
    try{
       if(method=="POST")
            var res = await axiosObj.post(path,body)
       else
            var res = await axiosObj.get(path)
       data = res.data
       if(!res.data.success) errors = res.data.errors
    }
    catch(e){
       errors = {default:(e as string).toString()}; 
    }
    if(errors?.default !=null)
        toast.error(errors.default);
    return {res:data,errors}
    
}

// function updateTokenInAxios(token:string){
//     axiosObj.defaults.headers.common['Authorization'] ="Bearer "+ token;
// }

 const api = {
    send
}


export default api;