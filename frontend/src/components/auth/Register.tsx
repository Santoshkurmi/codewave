import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import useRegister from "../../hooks/useRegister";

function Register() {

  const {data,err,updateData,execute} = useRegister()

  return (
    <>
      <div className="flex select-none h-[100vh] justify-center items-center">
        <div className="box border p-5 shadow-md w-[90vw] sm:w-[50vw] md:w-[30vw]">
          <div className="logo_name flex items-center justify-center gap-2">
            <img src={logo} width={"30px"} alt="Logo" />
            <span>CodeWave</span>
          </div>
          <div className="text-3xl text-gray-600 text-center">Register</div>
          <div className="form flex justify-center flex-col">

            <input type="text" value={data.name} onChange={(e) => updateData({name:e.target.value})} name="name" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your full name" />
            <span className="text-red-500">{err.name}</span>

            <input type="email" value={data.email} onChange={(e) => updateData({email:e.target.value})} name="email" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your email" />
            <span className="text-red-500">{err.email}</span>
            {/* <input type="text"name="country" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your country"  /> */}

            <input type="text" value={data.username} onChange={(e) => updateData({username:e.target.value})} name="username" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your username" />
            <span className="text-red-500">{err.username}</span>

            <input type="password" value={data.password} onChange={(e) => updateData({password:e.target.value})} name="password" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your password" />
            <span className="text-red-500">{err.password}</span>

            <input type="password" value={data.confirmPassword} onChange={(e) => updateData({confirmPassword:e.target.value})} name="confirmPassword" className="w-full bg-gray-200 p-3 my-4 rounded-md" placeholder="Enter your comfirm password" />
            <span className="text-red-500 mb-3">{err.confirmPassword}</span>

            <button disabled={data.loading} onClick={execute} className="disabled:bg-blue-400 text-xl text-white hover:bg-blue-600 active:bg-blue-800 bg-blue-700 p-3 rounded-md mb-2">Register</button>
            <Link to="/login" className="text-blue-500">Already Registered?</Link> <br />
            {/* <div className="h-[1px] bg-gray-400 my-4"></div> */}
            {/* <button className="text-xl text-white hover:bg-green-600 active:bg-green-800 bg-green-700 p-3 rounded-md">Register</button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Register