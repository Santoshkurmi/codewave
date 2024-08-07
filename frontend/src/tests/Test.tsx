import { useCallback, useMemo, useState } from "react"
import List from "./List"

function Test() {
    const [data,setData] = useState([
        {id:1,name:"A"},
        {id:2,name:"B"},
        {id:3,name:"C"},
        {id:4,name:"D"},
    ]);

    const change = useCallback( function change(){
        // setData([{id:3,name:"Sandu"},...data,{id:4,name:"Hari"}]);
        setData([
        {id:4,name:"D"},
        // {id:2,name:"B"},
        // {id:3,name:"C"},
        {id:1,name:"A"},
        ])
        // setData(prev=>([...prev,{id:2,name:"Sandu"}]))
    },[]);

  return (
    <div className="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh]">
        {
            data.map((detail,index)=>{
                return <List key={detail.id}  name={detail.name} />
            })
        }
        <button onClick={change} className="bg-green-500 rounded-lg py-2 px-4 hover:bg-green-600 active:bg-green-700">Click Me</button>
    </div>
  )
}

export default Test