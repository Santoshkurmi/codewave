import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { memo } from "react"

function MessageBox({id,user_id,current_user,text,lastMessageRef}:any) {
            return <div  ref={lastMessageRef}>
            
            {user_id==current_user?
           <div  className="rec  flex justify-start items-center gap-3 m-4">
            <FontAwesomeIcon className="" icon={faPerson} size="2xl" />
            <div className="msg w-1/2 bg-gray-600 text-white p-4 rounded-lg">{text}</div>
        </div>
              : <div  className="sent  flex justify-end m-4">
            <div className="msg w-1/2 bg-blue-600 text-white p-4 rounded-lg">{text}</div>
        </div>}
            </div>
}//MessageBox

export default memo( MessageBox)