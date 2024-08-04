import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons/faArrowAltCircleUp"
import { faBackward, faLeftLong, faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ListMessages() {
  return (
    <div className="fixed bg-white top-[10rem] left-[25rem] w-[50vw] border rounded-lg shadow-md px-8 py-5">
        <div className="header mb-6 gap-5 flex items-center">
            <FontAwesomeIcon icon={faLeftLong} />
            <FontAwesomeIcon icon={faPerson} size="2xl" />
            <span className="text-xl font-bold text-gray-600">Rahul Sapkota</span>
            <span className="text-gray-600 ">Active 5 hours ago</span>
        </div>
        <div className="sent w-1/2 border p-4">
            <div className="msg">Hello there how are you doing</div>
        </div>
    </div>
  )
}

export default ListMessages