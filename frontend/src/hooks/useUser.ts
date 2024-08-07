import { memo, useCallback, useState } from "react";
import api from "../axios/api";
import { toast } from "react-toastify";

function useUser(){
   
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(false);

   const getUsers = useCallback( async function(){

        setLoading(true);
        const {res,errors} = await api.send('/users');
        setLoading(false);

        if(errors==null){
            // toast.success(res.msg);
            setUsers(res.data);
            return;
        }//if not errors
    },[])//getUsers

    return {loading,users,getUsers}
    
}

export default useUser