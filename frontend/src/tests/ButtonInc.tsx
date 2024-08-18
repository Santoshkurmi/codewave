import { useContext } from "react"
import { CountContext, useStoreZust } from "./Test"
import { useStore } from "zustand"

function ButtonInc() {
  console.log("button")
  // const data = useContext(CountContext)
  //  const bears = useStore((state) => state.bears);
  return (
    
    <div>Button</div>
  )
}

export default ButtonInc