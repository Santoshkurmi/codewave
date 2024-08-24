import { faPerson, faPersonRifle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

function MessageProfile(props: any) {
  const navigate = useNavigate();

  return (
    <div onClick={() => {
      navigate('/messages/' + props.user_id, { state: { 'name': props.name } })
      // props.callback(props.name,props.user_id);
    }} className="flex hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-600 active:bg-gray-300 rounded-lg gap-5 my-3 mx-5 p-4 dark:border-b-0 border-b-[1px] items-center">
      <div className="icon" >

        {

          props.profile_pic ?
            <div className="profile">
              <img className="h-[60px] w-[60px] rounded-full"  src={"http://localhost:8000/storage/profiles/" + props.profile_pic} />
            </div>
            : <FontAwesomeIcon icon={faPerson} size="2xl" className="text-gray-600 dark:text-gray-200" />

        }

      </div>
      <div className="name_preview">
        <div className="name text-xl font-bold dark:text-gray-200 text-gray-700">{props.name}</div>
        <div className="name text-gray-700 dark:text-gray-200">User Id:{props.user_id}</div>
      </div>
    </div>
  )
}

export default MessageProfile