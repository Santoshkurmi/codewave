import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import useLogin from "../../hooks/useLogin";
import { ToastContainer } from "react-toastify";
function Login() {

  var {data,err,updateData,execute}  = useLogin();

  return (
    <>
    {/* <ToastContainer/> */}
    <div className="flex select-none h-[100vh] justify-center items-center">
      <div className="box border p-5 shadow-md w-[90vw] sm:w-[50vw] md:w-[30vw]">
        <div className="logo_name flex items-center justify-center gap-2">
          <img src={logo} width={"30px"} alt="Logo" />
          <span>CodeWave</span>
        </div>
        <div className="text-3xl text-gray-600 text-center">Login</div>
        <div  className="form flex justify-center flex-col">

          <input type="text" name="username" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your username" value={data.username} onChange={(e)=>updateData({username:e.target.value})} />
          <span className="text-red-500">{err.username}</span>

          <input type="password" name="password" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your password" value={data.password} onChange={(e)=>updateData({password:e.target.value})}/>
          <span className="text-red-500 mb-2">{err.password}</span>

          <button disabled={data.loading} onClick={execute}  className="disabled:bg-blue-400 text-xl text-white hover:bg-blue-600 active:bg-blue-800 bg-blue-700 p-3 rounded-md mb-2">Log In</button>

          <Link to="/forgotPassword" className="text-blue-500">Forgot Password?</Link> <br/>

          <div className="h-[1px] bg-gray-400 my-4"></div>

          <Link to={"/register"} className="text-xl text-center text-white hover:bg-green-600 active:bg-green-800 bg-green-700 p-3 rounded-md">Register</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login