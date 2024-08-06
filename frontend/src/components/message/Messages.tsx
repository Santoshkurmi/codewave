import MessageProfile from "./MessageProfile"
import { useState } from "react";
import ListMessages from "./ListMessages";
import { useNavigate } from "react-router-dom";

function Messages() {

    const [showMsgScreen,setShowMsgScreen] = useState(false)
    const [name,setName] = useState("")
    const [time,setTime] = useState("")
    const navigate = useNavigate()

    function openMessageScreen(namep:string,timep:string){
        // setName(namep)
        // setTime(timep)
        // setShowMsgScreen(true)
        navigate('/popMessages/'+namep)

    }

    const data = [
        {
            name:'Narayan Panthi',
            msg:'Kaile awone ho ra',
            time:'5 hours ago',
        },
        {
            name:'Santosh Kurmi',
            msg:'Ahh huna sakxa tyo ni',
            time:'2 hours ago'
        },
        {
            name:'Bishal Shrestha',
            msg:'Timi haru ko project vyo',
            time:'2 days ago'
        },
        {
            name:'Narayan Panthi',
            msg:'Kaile awone ho ra',
            time:'5 hours ago'
        },
        {
            name:'Santosh Kurmi',
            msg:'Ahh huna sakxa tyo ni',
            time:'2 hours ago'
        },
        {
            name:'Bishal Shrestha',
            msg:'Timi haru ko project vyo',
            time:'2 days ago'
        },
        {
            name:'Bishal Shrestha',
            msg:'Timi haru ko project vyo',
            time:'2 days ago'
        }
    ];
  return (
    <div className="fixed cursor-pointer bg-white top-[6rem] left-[0rem] w-[100vw] sm:left-[25rem] sm:w-[50vw] border rounded-lg shadow-md px-8 py-5">
        <div className="text-xl text-gray-700 font-bold mb-5">Messages</div>
        <div className="search mb-7">
            <input className="p-3 bg-gray-200 rounded-lg w-full" type="text" placeholder="Search Messages" />
        </div>
        <div className="profiles max-h-[60vh] overflow-y-auto">
        {
            data.map((each,key)=><MessageProfile {...each} key={key} callback={openMessageScreen} />)
        }
        </div>
        </div>
  )
}

export default Messages