
import { useState } from "react";
import api from "../axios/api";
import { toast } from "react-toastify";

function useConversation(){
   
    const [conversations,setConversations] = useState<[]>([]);
    const [loading,setLoading] = useState(false);

    async function getConversations(){

        setLoading(true);
        const {res,errors} = await api.send('/conversations');
        setLoading(false);

        if(errors==null){
            // toast.success(res.msg);
            setConversations(res.data);
            return;
        }//if not errors
        // toast.error(errors.user_id);
    }//getUsers

    return {loading,conversations,getConversations}
    
}

export default useConversation;