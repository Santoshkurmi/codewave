import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import logo from "../../assets/logo.svg"
import { faBell, faMoon } from "@fortawesome/free-regular-svg-icons"
import { faPerson, faSearch } from "@fortawesome/free-solid-svg-icons"
function Header() {
  return (
    <div 
    className="h-[5rem] z-50 bg-white fixed left-0 top-0 right-0 select-none shadow-lg rounded-md flex items-center justify-between px-8">
        <div className="left flex items-center gap-2">            
            <img src={logo} className=""  width={"50px"} alt="Logo" />
            <span className="pl-0 text-gray-700 font-bold text-xl">CodeWave</span>
                <div className="searchbox border relative">
                    <div className="icon  absolute top-0 left-2 bottom-0 flex justify-center items-center">
                      <FontAwesomeIcon icon={faSearch} size="xl" className="text-gray-700 hover:bg-gray-200 rounded-full p-4 sm:p-0"/>
                    </div>
                    <input className="hidden w-[30vw] max-w-[25rem] sm:block bg-gray-200 p-2 pl-10 rounded-md outline-gray-300" placeholder="Search here" type="text" />
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