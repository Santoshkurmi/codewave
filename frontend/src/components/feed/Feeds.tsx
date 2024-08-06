import { faPerson } from "@fortawesome/free-solid-svg-icons"
import Post from "../post/Post"

function Feeds() {
    const props = [
      {
        title:"How to center a div",
        user:"Xyz Abc",
        pic:faPerson,
        time: "Posted 2 hours ago",
        description:"I'm trying to center a div horizentally and vertically within its parent container. Can someone help me with the CSS?",
        code:'.parent{\ndisplay:flex;\njustify-content:center;}\n',
        votes:40,
        views:12000,
        feedback:5
    },
      {
        title:"How to make this changes",
        user:"Rahul shyam",
        pic:faPerson,
        time: "Posted 5 hours ago",
        description:"I'm helping everyone to center a div horizentally and vertically within its parent container. Can someone help me with the CSS?",
        code:'.parent{\ndisplay:flex;\njustify-content:center;}\n',
        votes:80,
        views:"12k",
        feedback:5
    },
      {
        title:"How to make this changes",
        user:"Rahul shyam",
        pic:faPerson,
        time: "Posted 5 hours ago",
        description:"I'm helping everyone to center a div horizentally and vertically within its parent container. Can someone help me with the CSS?",
        code:'.parent{\ndisplay:flex;\njustify-content:center;}\n',
        votes:80,
        views:"12k",
        feedback:5
    },
      {
        title:"How to make this changes",
        user:"Rahul shyam",
        pic:faPerson,
        time: "Posted 5 hours ago",
        description:"I'm helping everyone to center a div horizentally and vertically within its parent container. Can someone help me with the CSS?",
        code:'.parent{\ndisplay:flex;\njustify-content:center;}\n',
        votes:80,
        views:"12k",
        feedback:5
    },
      {
        title:"How to make this changes",
        user:"Rahul shyam",
        pic:faPerson,
        time: "Posted 5 hours ago",
        description:"I'm helping everyone to center a div horizentally and vertically within its parent container. Can someone help me with the CSS?",
        code:'.parent{\ndisplay:flex;\njustify-content:center;}\n',
        votes:80,
        views:"12k",
        feedback:5
    },
      {
        title:"How to make this changes",
        user:"Rahul shyam",
        pic:faPerson,
        time: "Posted 5 hours ago",
        description:"I'm helping everyone to center a div horizentally and vertically within its parent container. Can someone help me with the CSS?",
        code:'.parent{\ndisplay:flex;\njustify-content:center;}\n',
        votes:80,
        views:"12k",
        feedback:5
    },
      {
        title:"How to make this changes",
        user:"Rahul shyam",
        pic:faPerson,
        time: "Posted 5 hours ago",
        description:"I'm helping everyone to center a div horizentally and vertically within its parent container. Can someone help me with the CSS?",
        code:'.parent{\ndisplay:flex;\njustify-content:center;}\n',
        votes:80,
        views:"12k",
        feedback:5
    },
  ]
  return (
    <div className="p-5">
      {
        props.map((data,key)=>{
          return <Post {...data} key={key}/>
        })
      }
    </div>
  )
}

export default Feeds