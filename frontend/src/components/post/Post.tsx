import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Post(props:any) {
  return (
    <div className="mt-3 mb-10 border shadow-md rounded-lg p-6 flex flex-col gap-2">
        <div className="user flex gap-2">
            <FontAwesomeIcon icon={props.pic} size="lg"/>
            <div className="name font-bold text-gray-700">{props.user}</div>
        </div>
        <div className="title-time flex justify-between">
            <div className="title font-bold text-xl text-gray-700">{props.title}</div>
            <div className="time">{props.time}</div>
        </div>
        <div className="description text-lg">
            {props.description}
        </div>
        <div className="code p-3 bg-gray-300 rounded-lg">
            {props.code}
        </div>
        <div className="vote_views flex justify-between">
            <div className="vote">Votes:{props.votes}</div>
            <div className="vote">Feedback:{props.feedback}</div>
            <div className="views">Views:{props.views}</div>
        </div>
    </div>
  )
}

export default Post