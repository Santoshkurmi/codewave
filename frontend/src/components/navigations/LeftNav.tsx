import { faBell, faMessage } from "@fortawesome/free-regular-svg-icons"
import { faCode, faCross, faSearch, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import api from "../../axios/api";
import { BrowserRouter, NavLink, Outlet, RouterProvider, createBrowserRouter, useLocation, useNavigate } from "react-router-dom";
import Messages from "../message/Messages";
import userStore from "../../zustand/UserStore";
import useLogin from "../../hooks/useLogin";
import useLogout from "../../hooks/useLogout";

function LeftNav() {
    // const [active,setActive] = useState("");
    const [currentChat,setCurrentChat] = useState("");
    const navigate = useNavigate()
    const location = useLocation()
    const  {loading,logout} = useLogout()
    const links = [
        { text:"Messages",icon: faMessage,path:'/popMessages' },
        { text:"Posts",icon: faCode,path:'/posts' },
        { text:"Groups",icon: faUserGroup,path:'/groups' },
        { text:"Notifications",icon: faBell,path:'/notifications' },
        { text:"Settings",icon: faSearch,path:'/settings' },
        { text:"LogOut",icon: faCross,path:'/logout' },
];

    // const router = createBrowserRouter([
    //     {
    //         path:'/popMessage',
    //         element:<Messages/>
    //     }
    // ])

    const toggleMessageScreen = ()=>{
        if(location.pathname.includes('/popMessages')){
            setCurrentChat(location.pathname)
            navigate('/')
            return
        }
        navigate( currentChat ? currentChat: '/popMessages')
    }//toogle

  async function onClick (source:string){
        // setActive(source)
        if(source=="/logout"){
            logout()
        }//if logout
        else if(source=="/popMessages") toggleMessageScreen()
    }
    return (
        <div className="select-none  m-5 shadow-lg border p-4">
            {/* {openMessage?<Messages/>:<div></div>} */}
            {/* <RouterProvider router={router}/> */}
            <Outlet/>
            {
                links.map((data,key) => {
                    return (
                        <div key={key}
                        onClick={()=>onClick(data.path)}
                         className={ "cursor-pointer active:bg-gray-300 hover:bg-gray-200 p-4 transition-all duration-500 ease-in-out gap-5 flex items-center text-gray-600 "+ ( location.pathname.includes(data.path) ? "bg-gray-300":"") } >
                            <FontAwesomeIcon icon={data.icon} size="lg" />
                            <span>{data.text}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LeftNav