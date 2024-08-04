import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.svg"
import { useEffect, useRef, useState } from "react";
import api from "../../axios/api";
import { getToken, setToken } from "../../axios/tokens";

function Register() {
  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [password,setPassword] = useState("");

  const [nameError,setnameError] = useState("");
  const [emailError,setemailError] = useState("");
  const [confirmError,setconfirmError] = useState("");
  const [usernameError,setUsernameError] = useState("");
  const [passwordError,setPasswordError] = useState("");

  const navigate = useNavigate();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(()=>{
    if(getToken() !=null) navigate('/')
  },[]) 

  function validate(){
    setnameError("");
    setemailError("");
    setUsernameError("");
    setPasswordError("");
    setconfirmError("");
    let isError = false;
    if(name.length<6){
      setnameError("Name must be at least 6")
      isError = true;
    }
    if(email.length<6){
      setemailError("email must be at least 6")
      isError = true;
    }
    if(username.length<6){
      setUsernameError("username must be at least 6")
      isError = true;
    }
    if(password.length<6){
      setPasswordError("password must be at least 6")
      isError = true;
    }
    if(password != confirmPassword){
      setconfirmError("confirm password not matched!")
      isError = true;
    }
    return !isError;
  }//validate

  async function  register(){


    if( ! validate()) return;    
    if(btnRef.current) btnRef.current.disabled = true;
    try{
     const res =  await api.post("/register",{username,password,name,email,"confirm-password":confirmPassword})
     if(res.data.success){
     setToken(res.data.token)
     api.defaults.headers.common['Authorization'] = res.data.token;
     navigate("/");
     }
     else{
      if(res.data.error)
        setUsernameError(res.data.error);
      else{
        setUsernameError(res.data.errors.username)
        setPasswordError(res.data.errors.password)
        setnameError(res.data.errors.name)
        setemailError(res.data.errors.email)
        setconfirmError(res.data.errors["confirm-password"])
      }
      // alert(res.data.error);
     }
    }
    catch(error){
      setUsernameError(error+"")
    }

    if(btnRef.current) btnRef.current.disabled = false;
  }


  return (
    <div className="flex select-none h-[100vh] justify-center items-center">
      <div className="box border p-5 shadow-md w-[90vw] sm:w-[50vw] md:w-[30vw]">
        <div className="logo_name flex items-center justify-center gap-2">
          <img src={logo} width={"30px"} alt="Logo" />
          <span>CodeWave</span>
        </div>
        <div className="text-3xl text-gray-600 text-center">Register</div>
        <div  className="form flex justify-center flex-col">

          <input type="text" onChange={(e)=>setName(e.target.value)} name="name" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your full name"  />
          <span className="text-red-500">{nameError}</span>

          <input type="email" onChange={(e)=>setEmail(e.target.value)}name="email" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your email"  />
          <span className="text-red-500">{emailError}</span>
          {/* <input type="text"name="country" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your country"  /> */}

          <input type="text" onChange={(e)=>setUsername(e.target.value)} name="username" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your username"  />
          <span className="text-red-500">{usernameError}</span>

          <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your password"  />
          <span className="text-red-500">{passwordError}</span>

          <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} name="confirm-password" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your comfirm password"  />
          <span className="text-red-500 mb-3">{confirmError}</span>

          <button ref={btnRef} onClick={register} className="disabled:bg-blue-400 text-xl text-white hover:bg-blue-600 active:bg-blue-800 bg-blue-700 p-3 rounded-md mb-2">Register</button>
          <Link to="/login" className="text-blue-500">Already Registered?</Link> <br/>
          {/* <div className="h-[1px] bg-gray-400 my-4"></div> */}
          {/* <button className="text-xl text-white hover:bg-green-600 active:bg-green-800 bg-green-700 p-3 rounded-md">Register</button> */}
        </div>
      </div>
    </div>
  )
}

export default Register