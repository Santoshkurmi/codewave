import MessageProfile from "./MessageProfile"
import { useEffect, useState } from "react";
import useConversation from "../../hooks/useConversation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddNewUser from "./AddNewUser";
import { useGetConversationsQuery, useSendMessageMutation } from "../../api/apiSlice";

function Messages() {

    // const { loading, conversations, getConversations } = useConversation();
    const {isLoading:loading,data:conversations=[],isSuccess,isError}= useGetConversationsQuery();
    const [showAddNewUser,setShowNewUser] = useState(false)
    // console.log("Fetching the conversations")

    return (
        <div className="fixed  cursor-pointer bg-white top-[6rem] left-[0rem] w-[100vw] sm:left-[25rem] sm:w-[50vw] border rounded-lg shadow-md px-8 py-5">
            <div className="text-xl text-gray-700 font-bold mb-5">Messages</div>
            <div className="search mb-7">
                <input className="p-3 bg-gray-200 rounded-lg w-full" type="text" placeholder="Search Messages" />
            </div>
            <div className="profiles h-[60vh] overflow-y-auto relative">
                {
                   isSuccess ? conversations.map((each) => <MessageProfile name={each.user.name} user_id={each.user.id} key={each.conversation_id} />): <div></div>
                }
                {showAddNewUser? <AddNewUser/>:null} 
                <div onClick={()=>setShowNewUser(!showAddNewUser)} className="addNewUserCon bottom-5 right-5 rounded-full bg-gray-300 absolute p-1 hover:bg-gray-400 active:bg-gray-500">
                    <FontAwesomeIcon icon={faPlus} size="2xl"/>
                </div>
            </div>
        </div>
    )
}

export default Messages