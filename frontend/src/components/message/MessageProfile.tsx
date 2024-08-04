import { faPerson, faPersonRifle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function MessageProfile(props:any) {
  return (
    <div className="flex hover:bg-gray-200 active:bg-gray-300 rounded-lg gap-5 my-3 mx-5 p-4 border-b-[1px] items-center">
      <div className="icon">
        <FontAwesomeIcon icon={faPerson} size="2xl" className="text-gray-600"/>
      </div>
      <div className="name_preview">
        <div className="name text-xl font-bold text-gray-700">{props.name}</div>
        <div className="name text-gray-700">{props.msg} .{props.time}</div>
      </div>
    </div>
  )
}

export default MessageProfile