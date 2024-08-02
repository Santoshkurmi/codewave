import { faBell, faMessage } from "@fortawesome/free-regular-svg-icons"
import { faCode, faCross, faSearch, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";

function LeftNav() {
    const [active,setActive] = useState("");
    const links = [
        { text:"Messages",icon: faMessage },
        { text:"Posts",icon: faCode },
        { text:"Groups",icon: faUserGroup },
        { text:"Notifications",icon: faBell },
        { text:"Settings",icon: faSearch },
        { text:"LogOut",icon: faCross },
];
    const onClick = (source:string)=>{
        setActive(source)
    }
    return (
        <div className="select-none w-[10rem] md:w-[20rem] m-5 shadow-lg border p-4">
            {
                links.map(data => {
                    return (
                        <div
                        onClick={()=>onClick(data.text)}
                         className={"active:bg-gray-300 hover:bg-gray-200 p-4 transition-all duration-500 ease-in-out gap-5 flex items-center text-gray-600 "+ (active == data.text ? "bg-gray-300":"") } >
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