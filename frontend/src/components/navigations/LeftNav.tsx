import { faBell, faMessage } from "@fortawesome/free-regular-svg-icons"
import { faCode, faCross, faHome, faPeopleLine, faPerson, faSearch, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react";
import api from "../../axios/api";
import { BrowserRouter, NavLink, Outlet, RouterProvider, createBrowserRouter, useLocation, useNavigate } from "react-router-dom";
import Messages from "../message/Conversations";
import userStore from "../../zustand/UserStore";
import useLogin from "../../hooks/useLogin";
import useLogout from "../../hooks/useLogout";
import { useLogoutMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";
import { faCreativeCommons, faMagento } from "@fortawesome/free-brands-svg-icons";


function LeftNav() {
    
    // const [active,setActive] = useState("");
    const divRef = useRef(null)
    const [currentChat,setCurrentChat] = useState("");
    const navigate = useNavigate()
    const location = useLocation()
    // const  {loading,logout} = useLogout()
    const [logout,{isSuccess}] = useLogoutMutation();
    const links = [
        // { text:"Home",icon: faHome,path:'/' },
        // { text:"Messages",icon: faMessage,path:'/messages' },
        { text:"Messages",icon: faMessage,path:'/messages' },
        { text:"Posts",icon: faCode,path:'/posts' },
        { text:"Profile",icon: faPerson,path:'/profile' },
        // { text:"Notifications",icon: faBell,path:'/notifications' },
        { text:"Settings",icon: faSearch,path:'/settings' },
        { text:"LogOut",icon: faCross,path:'/logout' },
        { text:"People",icon: faPeopleLine },
        { text:"Mentions",icon: faMagento },
        { text:"Status",icon: faCreativeCommons },
];

    // const router = createBrowserRouter([
    //     {
    //         path:'/popMessage',
    //         element:<Messages/>
    //     }
    // ])

    const toggleMessageScreen = ()=>{
        if(location.pathname.includes('/messages')){
            setCurrentChat(location.pathname)
            navigate('/')
            return
        }
        navigate( currentChat ? currentChat: '/messages')
    }//toogle

  async function onClick (source:string){
        // setActive(source)
        if(source=="/logout"){
            logout()
        }//if logout
        else if(source=="/messages") toggleMessageScreen();
        else if(source=="/profile") navigate('/profile');
    }
    return (
        <div className="select-none dark:border-gray-400 dark:bg-black mx-3 shadow-lg border rounded-lg p-4">
            {/* {openMessage?<Messages/>:<div></div>} */}
            {/* <RouterProvider router={router}/> */}
            {
                links.map((data,key) => {
                    return (
                        <div key={key}
                        onClick={()=>onClick(data.path)}
                         className={ "cursor-pointer rounded-lg dark:hover:bg-gray-700 dark:active:bg-gray-800 active:bg-gray-300 hover:bg-gray-200 p-4 transition-all duration-500 ease-in-out gap-5 flex items-center text-gray-600 dark:text-slate-300 "+ ( location.pathname.includes(data.path) ? "bg-gray-300 dark:bg-gray-600":"") } >
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
