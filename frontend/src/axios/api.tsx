import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import useAuthStore from "../zustand/AuthStore";


axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const axiosFunc =()=> axios.create(
    {
        baseURL:"http://localhost:8000/api/v1",
        headers:{
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer '+getToken()
        },
        withCredentials:true,
        withXSRFToken:true,
        
        
    }
);

async function send(path:string,body:any={},method:string|null='POST'){
    // kkk
    // axiosObj().defaults.headers.get['Authorization'] ="mama "+ getToken()?.toString();
    const axiosObj = axiosFunc();
    var data:Record<string,any> = {};
    var errors:Record<string,string>|null = null;
    var res = null;
    var msg =null;
    try{
       if(method=="POST")
             res = await axiosObj.post(path,body)
       else
             res = await axiosObj.get(path)
       data = res.data
    //    if(!res.data.success) errors = res.data.errors
    }
    catch(e:any){
       errors = {default:(e as string).toString()}; 
       console.log(e.response.data.message);
       msg = e.response.data?.message;
     
    }
    // alert(msg);

    if(msg){
        toast.error(msg+"");
    }
    else if (errors?.default){
        toast.error(errors.default+"");
    }


    return {res:data,errors}
    
}

// function updateTokenInAxios(token:string){
//     axiosObj.defaults.headers.common['Authorization'] ="Bearer "+ token;
// }

 const api = {
    send
}

export {send};

export default api;