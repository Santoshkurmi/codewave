import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
function Login() {
  return (
    <div className="flex select-none h-[100vh] justify-center items-center">
      <div className="box border p-5 shadow-md w-[90vw] sm:w-[50vw] md:w-[30vw]">
        <div className="logo_name flex items-center justify-center gap-2">
          <img src={logo} width={"30px"} alt="Logo" />
          <span>CodeWave</span>
        </div>
        <div className="text-3xl text-gray-600 text-center">Login</div>
        <div  className="form flex justify-center flex-col">
          <input type="text" name="username" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your username"  />
          <input type="password" name="password" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your password"  />
          <button className="text-xl text-white hover:bg-blue-600 active:bg-blue-800 bg-blue-700 p-3 rounded-md mb-2">Log In</button>
          <Link to="/forgotPassword" className="text-blue-500">Forgot Password?</Link> <br/>
          <div className="h-[1px] bg-gray-400 my-4"></div>
          <Link to={"/register"} className="text-xl text-center text-white hover:bg-green-600 active:bg-green-800 bg-green-700 p-3 rounded-md">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login