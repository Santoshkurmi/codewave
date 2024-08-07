import { useCallback, useEffect, useRef, useState } from "react";
import api from "../axios/api";
import { toast } from "react-toastify";

function useMessage(){
   
    const [messages,setMessages] = useState<any>([]);
    const [user,setUser] = useState<any>(null);
    const [loading,setLoading] = useState(false);
    const userRef = useRef(user)

    useEffect(()=>{
        userRef.current = user
    },[user])

    const getMessages = useCallback( async function getMessages(user_id:number){
        setLoading(true);
        const {res,errors} = await api.send('/messages',{user_id});
        setLoading(false);

        if(errors==null){
            // toast.success(res.msg.toString());
            setMessages(res.data.messages);
            setUser(res.data.user);
            return;
        }//if not errors
        if(errors.user_id)
            toast.error(errors.user_id.toString());
    },[])//getUsers

   const sendMessage = useCallback(async function sendMessage(text:string){

        setLoading(true);
        const {res,errors} = await api.send('/message/send',{user_id:userRef.current.id,text});
        setLoading(false);

        if(errors==null){
            // toast.success(res.msg);
            setMessages((prev:any)=>([...prev,res.data]));
            return;
        }//if not errors
        toast.error(errors.user_id+errors.text);
    },[])//getUsers

    return {loading,messages,user,sendMessage,getMessages};
    
}

export default useMessage;