import MessageProfile from "./MessageProfile"

function Messages() {
    const data = [
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
    <div className="fixed bg-white top-[10rem] left-[25rem] w-[50vw] border rounded-lg shadow-md px-8 py-5">
        <div className="text-xl text-gray-700 font-bold mb-5">Messages</div>
        <div className="search mb-7">
            <input className="p-3 bg-gray-200 rounded-lg w-full" type="text" placeholder="Search Messages" />
        </div>
        <div className="profiles max-h-[60vh] overflow-y-auto">
        {
            data.map((each)=><MessageProfile {...each} />)
        }
        </div>
    </div>
  )
}

export default Messages