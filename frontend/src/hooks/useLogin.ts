import { useCallback, useEffect, useRef, useState } from "react";
import api from "../axios/api";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userStore from "../zustand/UserStore";

function useLogin() {

  const [data,setData] = useState({
    username:"santosh@gmail.com",
    password:"Duffer123",
    loading:false,
  });

  const dataRef = useRef(data)
  useEffect(()=>{
    dataRef.current = data;
  },[data])

  const [err,setErr] = useState({
    username:"",
    password:"",
  });

  const navigate = useNavigate()
  const {setUser} = userStore()

  const updateErr =useCallback( function  updateErr (value:Partial<typeof data>){
   setErr(prev=>({...prev,...value}));
  },[])

  const updateData = useCallback( function  updateData (value:Partial<typeof data>){
   setData(prev=>({...prev,...value}));
  },[])


  const validate = useCallback(function validate(){

    var errors:Record<string,string> = {}
    updateErr({username:"",password:""})

    const {username,password} = dataRef.current;

    if(username.length<6){
        errors.username  ="Username must be at least 6 chars"
    }
    if(password.length<6) {
          errors.password =  "Password must be at least 6 chars"
    }
    updateErr(errors)
    return Object.keys(errors).length==0;
  },[])//validate

  const execute = useCallback(async function execute(){

    if(!validate()) return;
    updateData({loading:true})

    var {username,password} = dataRef.current;
    var {res,errors} =await api.send("/login",{username,password})

    updateData({loading:false})

    if(errors==null){
        toast.success(res.msg,{position:"top-center",autoClose:1000})
        // setToken(res.token)
        // console.log(res.token,res.data.id)
        setUser({token:res.token,user_id:res.data.id})
        // setTimeout(()=>navigate("/"),2000)
        // navigate("/")
        return;
    }//if success
    updateErr(errors)
  },[])//execute

  

  return {data,err,updateData,execute}

}

export default useLogin