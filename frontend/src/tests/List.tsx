import { PropsWithChildren, memo } from "react"

function List(props:any) {
    alert(props.name)
    // alert("Called Me wow")
  return (
    <div className="p-4 m-2 border rounded-lg shadow-lg">
        <div className="div">
            {props.name}
        </div>
    </div>
  )
}

export default memo(List)
// export default List