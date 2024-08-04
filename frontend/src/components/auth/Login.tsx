import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.svg"
import { useEffect, useRef, useState } from "react"
import api from "../../axios/api";
import { getToken, setToken } from "../../axios/tokens";
function Login() {


  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [usernameError,setUsernameError] = useState("");
  const [passwordError,setPasswordError] = useState("");
  const btnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  useEffect(()=>{
    if(getToken() !=null) navigate('/')
  },[]) 

  async function  login(){
    if(username.length<6)return setUsernameError("Username must be at least 6 chars")
    setUsernameError("");
    if(password.length<6) return setPasswordError("Password must be at least 6 chars")
    setPasswordError("");
    
    if(btnRef.current) btnRef.current.disabled = true;
    try{
     const res =  await api.post("/login",{username,password})
     if(res.data.success){
     setToken(res.data.token)
     api.defaults.headers.common['Authorization'] = res.data.token;
     navigate('/')
    //  alert(res.data.token);
     }
     else{
      if(res.data.error)
        setUsernameError(res.data.error);
      else{
        setUsernameError(res.data.errors.username)
        setPasswordError(res.data.errors.password)
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
        <div className="text-3xl text-gray-600 text-center">Login</div>
        <div  className="form flex justify-center flex-col">
          <input type="text" name="username" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your username" value={username} onChange={(e)=>setUserName(e.target.value)} />
          <span className="text-red-500">{usernameError}</span>
          <input type="password" name="password" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <span className="text-red-500 mb-2">{passwordError}</span>
          <button  ref={btnRef} onClick={login}  className="disabled:bg-blue-400 text-xl text-white hover:bg-blue-600 active:bg-blue-800 bg-blue-700 p-3 rounded-md mb-2">Log In</button>
          <Link to="/forgotPassword" className="text-blue-500">Forgot Password?</Link> <br/>
          <div className="h-[1px] bg-gray-400 my-4"></div>
          <Link to={"/register"} className="text-xl text-center text-white hover:bg-green-600 active:bg-green-800 bg-green-700 p-3 rounded-md">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login