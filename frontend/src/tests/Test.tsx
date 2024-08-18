import { createContext, useRef, useState } from "react"
import List from "./List"
import { create } from "zustand"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"


// export const useStoreZust = create((set,get)=>({
//   count:0,
//   increase:()=>set((state:any)=>({count:state.count+1}))
// })) 

function Test() {

  const menu = useRef<HTMLDivElement>(null);
  // const menu = useRef<HTMLDivElement>(null);
  const [isMenuShow,setMenuShow] = useState(true);
  
  function toggleMenu(e:Event){
    // setMenuShow(!isMenuShow)
    console.log(window.innerHeight)
    var height = menu.current?.clientHeight || 0
    var postionOfIcon = (e.target as HTMLDivElement).getBoundingClientRect();
    var top = postionOfIcon.top;
    var bottom = postionOfIcon.bottom;

    if(top>=height){
      console.log("Place the menu at the top");
    }
    else if( (window.innerHeight- bottom)>height){
      console.log("Place at teh bottom")
    }
    else{
      console.log("It is problem")
    }
    console.log(height)
  }
  console.log("Test")
  return (
    // <CountContext.Provider value={{count,setCount}}>
      
    <div className="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh]">
        <div className="box select-none border w-[30vw] p-4 m-2 rounded-lg shadow-lg ">
          <div className="row flex justify-between ">
            <div className="title">Title</div>
            
            <div onClick={toggleMenu} className="bars rounded-full active:p-2 active:bg-gray-200  hover:bg-gray-100 h-[3rem] w-[3rem] relative">
              <FontAwesomeIcon icon={faBars} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-5 cursor-pointer hover:opacity-80 active:opacity-60 " size="2xl" />

              <div ref={menu} className={"float   bottom-[100%] right-[100%] shadow-xl absolute w-[100px] h-[200px] rounded-lg bg-white border "+ (isMenuShow? "":"hidden") }>
                I am floating
            </div>
            
            </div>
          </div>
        </div>
    </div>
    // </CountContext.Provider>
  )
}

export default Test