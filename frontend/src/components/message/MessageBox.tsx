import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { memo } from "react"
import { useNavigate } from "react-router-dom"

function MessageBox({id,pic,conversation_id,user_id,current_user,text,lastMessageRef}:any) {
            
        // console.log("Message box")
        const navigate = useNavigate();
            
            return <div  ref={lastMessageRef}>

            
            {user_id==current_user?
           <div  className="rec  flex justify-start items-center gap-3 m-4">
            { pic? <img onClick={()=>navigate('/profile/'+user_id)} className="h-[50px] cursor-pointer w-[50px] rounded-full" src={"http://localhost:8000/storage/profiles/" + pic} />
            :
             <FontAwesomeIcon className="" icon={faPerson} size="2xl" />}
            <div className="msg w-1/2 bg-gray-600 text-white p-4 rounded-lg">{text}</div>
        </div>
              : <div  className="sent  flex justify-end m-4">
            <div className={"msg w-1/2 bg-blue-600 text-white p-4 rounded-lg "+ (conversation_id>0?"bg-blue-500":(conversation_id==-1? "bg-green-500":"bg-red-600") ) }>{text}</div>
        </div>}
            </div>
}//MessageBox

export default memo( MessageBox)