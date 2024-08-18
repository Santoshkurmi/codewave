import {  faMessage } from "@fortawesome/free-regular-svg-icons"
import { faCode, faHome, faPeopleArrows, faSearch, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";

function PhoneNav() {
    const [active,setActive] = useState("Home");
    const links = [
        { text:"Home",icon: faHome },
        { text:"Posts",icon: faCode },
        { text:"Messages",icon: faMessage },
        { text:"Groups",icon: faUserGroup },
        { text:"Search",icon: faSearch },
        { text:"Profile",icon: faPeopleArrows },
];
    const onClick = (source:string)=>{
        setActive(source)
    }
    return (
        <div className="select-none flex flex-row justify-between  m-2 mt-0 shadow-lg border p-4">
            {
                links.map((data,key) => {
                    return (
                        <div key={key}
                        onClick={()=>onClick(data.text)}
                         className={"rounded-full p-2 hover:bg-gray-200 "+ (active == data.text ? "bg-gray-300":"") } >
                            <FontAwesomeIcon icon={data.icon} size="lg" />
                            {/* <span>{data.text}</span> */}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PhoneNav