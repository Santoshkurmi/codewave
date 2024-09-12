import MessageProfile from "./MessageProfile"
import { useEffect, useState } from "react";
import useConversation from "../../hooks/useConversation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddNewUser from "./AddNewUser";
import { useGetConversationsQuery, useSendMessageMutation } from "../../api/apiSlice";


function Messages({ setSelectedChat }: any) {

    // const { loading, conversations, getConversations } = useConversation();
    const { isLoading: loading, data: conversations = [], isSuccess, isError } = useGetConversationsQuery();
    const [showAddNewUser, setShowNewUser] = useState(false)


    return (
        <div className="flex flex-col h-full  rounded-lg shadow-md px-8 pt-2 lg:py-5">
            <div className="profileHeader flex justify-between">
                <div className="msg_text text-3xl text-gray-700 dark:text-gray-200 font-bold  mb-5">Chats</div>
                <div onClick={() => setShowNewUser(!showAddNewUser)} className="addNewUserCon hover:text-gray-500 active:text-gray-600">
                    <FontAwesomeIcon icon={faPlus} size="2xl" />
                </div>

            </div>
            <div className="search mb-7">

                <input className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" type="text" placeholder="Search Messages" />
            </div>

            {

                loading ? <div className=" flex grow overflow-y-auto justify-center items-center">
                    <div className="spinner h-32 w-32 shadow-lg rounded-full"></div>
                </div>
                    :
                    <div className="profiles grow overflow-y-auto relative">
                        {
                            isSuccess ? conversations.map((each) => <MessageProfile conversation={each.conversation} setSelectedChat={setSelectedChat} profile_pic={each.user.profile?.profile_pic} name={each.user.name} user_id={each.user.id} key={each.conversation_id} />) : <div></div>
                        }
                        {showAddNewUser ? <AddNewUser setSelectedChat={setSelectedChat} /> : null}

                    </div>
            }



        </div>
    )
}

export default Messages