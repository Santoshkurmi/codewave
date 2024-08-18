import { memo } from "react"
import ButtonInc from "./ButtonInc"

function Parent() {
  console.log("Parent")
  return (
    <div>
        Parent
        <ButtonInc/>
    </div>

  )
}

export default  memo( Parent )
