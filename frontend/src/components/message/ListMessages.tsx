import { faBackward, faClose, faLeftLong, faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { LegacyRef, useEffect, useMemo, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import useMessage from "../../hooks/useMessage"
import MessageBox from "./MessageBox"

function ListMessages(props: any) {

  const { user_id } = useParams()
  const location = useLocation().state
  const lastMessageRef = useRef<any>();

  const navigate = useNavigate()
  const [msg, setMsg] = useState("")
  const { loading, messages, user, getMessages, sendMessage } = useMessage();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    getMessages(user_id as any as number);
  }, [])


  const renderMessages = useMemo(() => {
    return messages.map((msg: any, key: number) => {
      // console.log(key)
      return <MessageBox key={key} {...msg} current_user={user_id} lastMessageRef={lastMessageRef} />
    })//map
  }, [messages])

  return (
    <div className="fixed bg-white border top-[6rem] left-[25rem] w-[50vw] rounded-lg shadow-md px-8 py-5">
      <div className="center flex justify-between  items-center align-middle">
        <div className="header justify-center mb-6 gap-5 flex items-center ">
          <FontAwesomeIcon onClick={() => navigate('/popMessages')} className="hover:bg-gray-300 active:bg-gray-200 rounded-lg p-3" icon={faLeftLong} />
          <FontAwesomeIcon icon={faPerson} size="2xl" />
          <span className="text-xl font-bold text-gray-600">{user != null ? user.name : location?.name}</span>
          {/* <span className="text-gray-600 ">{props.active}</span> */}
        </div>
        <FontAwesomeIcon icon={faClose} onClick={() => navigate('/')} size="2xl" className="" />
      </div>

      <div className="messages h-[60vh] overflow-y-auto">
        {renderMessages}
      </div>
      <form className="type_msg flex items-center gap-3">
        <input type="text" onChange={(e) => setMsg(e.target.value)} value={msg} className="bg-gray-200 w-full p-4 rounded-lg focus:outline-gray-300 my-4" placeholder="Enter to type messages" />
        <input type="submit" value={"Send"} disabled={msg ? false : true} onClick={(e) => { e.preventDefault(); sendMessage(msg); setMsg(""); }} className="disabled:bg-blue-300 border p-3 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white" />
      </form>
    </div>
  )
}

export default ListMessages