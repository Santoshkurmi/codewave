import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
function Register() {
  return (
    <div className="flex select-none h-[100vh] justify-center items-center">
      <div className="box border p-5 shadow-md w-[90vw] sm:w-[50vw] md:w-[30vw]">
        <div className="logo_name flex items-center justify-center gap-2">
          <img src={logo} width={"30px"} alt="Logo" />
          <span>CodeWave</span>
        </div>
        <div className="text-3xl text-gray-600 text-center">Register</div>
        <div  className="form flex justify-center flex-col">
          <input type="text" name="name" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your full name"  />
          <input type="email" name="email" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your email"  />
          <input type="text"name="country" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your country"  />
          <input type="text" name="username" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your username"  />
          <input type="password" name="password" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your password"  />
          <input type="password" name="confirm-password" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your comfirm password"  />
          <button className="text-xl text-white hover:bg-blue-600 active:bg-blue-800 bg-blue-700 p-3 rounded-md mb-2">Register</button>
          <Link to="/login" className="text-blue-500">Already Registered?</Link> <br/>
          {/* <div className="h-[1px] bg-gray-400 my-4"></div> */}
          {/* <button className="text-xl text-white hover:bg-green-600 active:bg-green-800 bg-green-700 p-3 rounded-md">Register</button> */}
        </div>
      </div>
    </div>
  )
}

export default Register