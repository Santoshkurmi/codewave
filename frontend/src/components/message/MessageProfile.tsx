import { faPerson, faPersonRifle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

function MessageProfile(props:any) {
  const navigate = useNavigate();
  return (
    <div onClick={()=>{
        navigate('/popMessages/' + props.user_id,{state:{'name':props.name}})
      // props.callback(props.name,props.user_id);
    }} className="flex hover:bg-gray-200 active:bg-gray-300 rounded-lg gap-5 my-3 mx-5 p-4 border-b-[1px] items-center">
      <div className="icon">
        <FontAwesomeIcon icon={faPerson} size="2xl" className="text-gray-600"/>
      </div>
      <div className="name_preview">
        <div className="name text-xl font-bold text-gray-700">{props.name}</div>
        <div className="name text-gray-700">User Id:{props.user_id}</div>
      </div>
    </div>
  )
}

export default MessageProfile