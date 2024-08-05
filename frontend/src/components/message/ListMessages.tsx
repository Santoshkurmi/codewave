import { faBackward, faLeftLong, faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ListMessages(props:any) {
  const messages = [
    {
      "sender":"me",
      "receiver":"123",
      "msg":"Hello there I am fine"
    },
    {
      "sender":"123",
      "receiver":"me",
      "msg":"Hello there I am fine"
    },
    {
      "sender":"me",
      "receiver":"123",
      "msg":"Hello there I am fine"
    },
    {
      "sender":"123",
      "receiver":"me",
      "msg":"Hello there I am fine"
    },
    {
      "sender":"me",
      "receiver":"123",
      "msg":"Hello there I am fine"
    },
    {
      "sender":"123",
      "receiver":"me",
      "msg":"Hello there I am fine"
    },
  ]
  return (
    <div className="fixed bg-white top-[10rem] left-[25rem] w-[50vw] border rounded-lg shadow-md px-8 py-5">
        <div className="header mb-6 gap-5 flex items-center">
            <FontAwesomeIcon onClick={props.closeMessageScreen} className="hover:bg-gray-300 active:bg-gray-200 rounded-lg p-3" icon={faLeftLong} />
            <FontAwesomeIcon icon={faPerson} size="2xl" />
            <span className="text-xl font-bold text-gray-600">{props.name}</span>
            <span className="text-gray-600 ">{props.active}</span>
        </div>

        <div className="messages max-h-[40vh] overflow-y-auto">
        {
          messages.map(msg=>{
            if(msg.sender!="me")
          return <div className="rec  flex justify-start items-center gap-3 m-4">
            <FontAwesomeIcon className="" icon={faPerson} size="2xl" />
            <div className="msg w-1/2 bg-gray-600 text-white p-4 rounded-lg">Hello there how are you doing</div>
        </div>
            else
              return <div className="sent  flex justify-end m-4">
            <div className="msg w-1/2 bg-blue-600 text-white p-4 rounded-lg">Hello there how are you doing</div>
        </div>
          })
        }
        </div>
        <div className="type_msg flex items-center gap-3">
          <input type="text" className="bg-gray-200 w-full p-4 rounded-lg focus:outline-gray-300 my-4" placeholder="Enter to type messages" />
          <button className=" border p-3 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white">Send</button>
        </div>
    </div>
  )
}

export default ListMessages