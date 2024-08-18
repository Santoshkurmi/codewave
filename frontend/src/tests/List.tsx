import { PropsWithChildren, memo } from "react"
import Parent from "./Parent"
import { useStoreZust } from "./Test";

function List() {
  console.log("List")
  const count:any = useStoreZust((state:any)=>state.count);
  const increase:any = useStoreZust((state:any)=>state.increase);
  return (
    <div className="p-4 m-2 border rounded-lg shadow-lg">
        <div className="div">
    {count}
    <button onClick={increase}>Inc</button>
          List
          <Parent/>
        </div>
    </div>
  )
}

export default List
// export default List