import { faBell, faMessage } from "@fortawesome/free-regular-svg-icons"
import { faCode, faCross, faSearch, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import api from "../../axios/api";
import { useNavigate } from "react-router-dom";
import Messages from "../message/Messages";
import userStore from "../../zustand/UserStore";

function LeftNav() {
    const [active,setActive] = useState("");
    const [openMessage,setOpenMessaage] = useState(false);
    const navigate = useNavigate()
    const setUser = userStore().setUser;
    const links = [
        { text:"Messages",icon: faMessage },
        { text:"Posts",icon: faCode },
        { text:"Groups",icon: faUserGroup },
        { text:"Notifications",icon: faBell },
        { text:"Settings",icon: faSearch },
        { text:"LogOut",icon: faCross },
];

    const toggleMessageScreen = ()=>{
        setOpenMessaage(!openMessage)
    }

  async function onClick (source:string){
        setActive(source)
        if(source=="LogOut"){
                const {errors} =await api.send("/logout",null,"")
                if(errors){
                    alert(errors.toString())
                    setUser({token:''})
                }
                else{
                setUser({token:''})
                }
        }//if logout
        else if(source=="Messages") toggleMessageScreen()
    }
    return (
        <div className="select-none  m-5 shadow-lg border p-4">
            {openMessage?<Messages/>:<div></div>}
            {
                links.map(data => {
                    return (
                        <div
                        onClick={()=>onClick(data.text)}
                         className={"cursor-pointer active:bg-gray-300 hover:bg-gray-200 p-4 transition-all duration-500 ease-in-out gap-5 flex items-center text-gray-600 "+ (active == data.text ? "bg-gray-300":"") } >
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