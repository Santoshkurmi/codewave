import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useEffect, useMemo, useState } from "react"
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import createFuzzySearch from "@nozbe/microfuzz";
import NewUserProfile from "./NewUserProfile";

function AddNewUser() {

    const { loading, users, getUsers } = useUser()
    const [filteredUsers, setFilteredUsers] = useState<any>([])

    const navigate = useNavigate()

    const fuzzySearch = useMemo(() => {
        return createFuzzySearch(users, {
            key: 'name',
            strategy: 'aggressive'
        });
    }, [users]);

    // alert("Hello");
    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        mapUsers()
    }, [users]);

    const mapUsers = useCallback(()=>{
        const formatedList = users.map(user => {
            return { item: user }
        })
        setFilteredUsers(formatedList)
    },[users])

    const filter = useCallback((text: string) => {
        if (text.length == 0) {
            mapUsers()
            return;
        }//if
        setFilteredUsers(fuzzySearch(text));
    }, [users])//fuzzy Search

    return (
        <div className="bg-white z-50   border shadow-lg p-6 absolute top-5 rounded-md left-0 w-full">
            <input onChange={e => filter(e.target.value)} className="mb-4 bg-gray-200 border w-full p-3 rounded-lg" type="text" placeholder="Search User" />
            <div className="divider w-full h-[1px] bg-gray-300 mb-6"></div>
            <div className="overflow-y-auto h-[40vh]">

                {
                    filteredUsers.map((user: any) => {
                        // {console.log(user)}
                       return  <NewUserProfile key={user.item.id} {...user.item}/>
                    })
                }

            </div>

        </div>
    )
}

export default AddNewUser