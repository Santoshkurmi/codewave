import { faCreativeCommons, faMagento } from "@fortawesome/free-brands-svg-icons";
import {  faPeopleLine } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";

function LeftNavBottom() {
    const [active,setActive] = useState("");
    const links = [
        { text:"People",icon: faPeopleLine },
        { text:"Mentions",icon: faMagento },
        { text:"Status",icon: faCreativeCommons },
];
    const onClick = (source:string)=>{
        setActive(source)
    }
    return (
        <div className="select-none dark:bg-slate-700 m-5 shadow-lg border p-4">
            {
                links.map((data,key) => {
                    return (
                        <div key={key}
                        onClick={()=>onClick(data.text)}
                         className={"cursor-pointer active:bg-gray-300 hover:bg-gray-200 p-4 transition-all duration-500 ease-in-out gap-5 flex items-center text-gray-600 dark:text-slate-300 "+ (active == data.text ? "bg-gray-300":"") } >
                            <FontAwesomeIcon icon={data.icon} size="lg" />
                            <span>{data.text}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LeftNavBottom