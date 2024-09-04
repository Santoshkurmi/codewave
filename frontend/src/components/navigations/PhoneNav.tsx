import { faMessage } from "@fortawesome/free-regular-svg-icons"
import { faCode, faHome, faPeopleArrows, faSearch, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { NavLink } from "react-router-dom";

function PhoneNav() {
    const [active, setActive] = useState("Home");
    const links = [
        { text: "Home", icon: faHome, action: '/' },
        { text: "Posts", icon: faCode, action: '/posts' },
        { text: "Messages", icon: faMessage, action: '/messages' },
        { text: "Groups", icon: faUserGroup, action: '/groups' },
        { text: "Search", icon: faSearch, action: '/search' },
        { text: "Profile", icon: faPeopleArrows, action: '/profile' },
    ];
    const onClick = (source: string) => {
        setActive(source)
    }
    return (
        <div className="select-none pb-10 pt-4 px-5  flex flex-row justify-between mb-0  mt-0 shadow-lg">
            {
                links.map((data, key) => {
                    return (
                        <NavLink key={key} to={data.action}>

                            <div
                                onClick={() => onClick(data.text)}
                                className={"rounded-full p-2 dark:hover:bg-gray-600 hover:bg-gray-200 " + (active == data.text ? "bg-gray-300 dark:bg-gray-700" : "")} >
                                <FontAwesomeIcon icon={data.icon} size="lg" />
                                {/* <span>{data.text}</span> */}
                            </div>
                        </NavLink>

                    )
                })
            }
        </div>
    )
}

export default PhoneNav