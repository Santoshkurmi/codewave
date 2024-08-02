import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import logo from "../../assets/logo.svg"
import { faBell, faMoon } from "@fortawesome/free-regular-svg-icons"
import { faPerson } from "@fortawesome/free-solid-svg-icons"
function Header() {
  return (
    <div 
    className="h-[5rem] z-50 bg-white fixed left-0 top-0 right-0 select-none shadow-lg rounded-md flex items-center justify-between px-8">
        <div className="left flex items-center gap-2">            
            <img src={logo} className=""  width={"50px"} alt="Logo" />
            <span className="pl-0 text-gray-700 font-bold text-xl">CodeWave</span>
                <div className="searchbox">
                    <input className="bg-gray-200 p-2 rounded-md outline-gray-300 w-[20rem]" placeholder="Search here" type="text" />
                </div>
        </div>
            
        <div className="right text-gray-700  flex gap-5 pr-5">
            <FontAwesomeIcon icon={faBell} size="2x" />
            <FontAwesomeIcon icon={faMoon} size="2x" />
            <FontAwesomeIcon icon={faPerson} size="2x" />
        </div>
    </div>
  )
}

export default Header