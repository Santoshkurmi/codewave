import { faPerson, faPersonRifle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Conversation } from "../../api/apiSlice";

function MessageProfile(props: any) {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {conversation}:Conversation = props;
  const dest = "/messages/"+props.user_id;
  

  return (
    <NavLink to={dest} 
     className={(pathname == dest && 'bg-gray-300 dark:bg-gray-700')+" flex cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800  active:bg-gray-300 rounded-lg gap-5 my-3  p-4 pl-1 dark:border-b-0 border-b-[1px] items-center"}>
      <div className="icon" >

        {

          props.profile_pic ?
            <div className="profile">
              <img className="h-[60px] w-[60px] object-cover rounded-full"  src={"http://localhost:8000/storage/profiles/" + props.profile_pic} />
            </div>
            : <FontAwesomeIcon icon={faPerson} size="2xl" className="text-gray-600 dark:text-gray-200" />

        }

      </div>
      <div className="name_preview">
        <div className="name text-xl font-bold dark:text-gray-200 text-gray-700">{props.name}</div>
        <div className="name text-gray-700 dark:text-gray-200">{  conversation.last_message?.text.substring(0,15)} ... 23h</div>
      </div>
    </NavLink>
  )
}

export default MessageProfile