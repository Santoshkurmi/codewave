import { useEffect, useRef, useState } from "react"
import Feeds from "./feed/Feeds"
import Header from "./navigations/Header"
import LeftNav from "./navigations/LeftNav"
import LeftNavBottom from "./navigations/LeftNavBottom"
import PhoneNav from "./navigations/PhoneNav"
import RightNav from "./navigations/RightNav"
import { getToken } from "../axios/tokens"
import { Outlet, useNavigate } from "react-router-dom"
import EchoConfig from "../echo/echoConfig"

function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHidden,setHeaderHidden] = useState(false);
  const previousTop = useRef(0);
  const navigate = useNavigate()
  useEffect(()=>{
    
   const scrollContainer =  scrollContainerRef.current;
   if(!scrollContainer) return;

   const precison = 300;

   const scrollCallback = (event:Event)=>{
    
    const difference = previousTop.current - scrollContainer.scrollTop;

    if(Math.abs(difference)<precison) return;
    if( difference <=0 ){
       setHeaderHidden(true);
      // console.log("It is moving up with difference ");

    }
    else{
      setHeaderHidden(false);
      // console.log("It is moving down with difference ");

    }
    previousTop.current = scrollContainer.scrollTop;
      // console.log(scrollContainer.scrollTop);

   }//callback

   scrollContainer.addEventListener('scroll',scrollCallback);

   return ()=>scrollContainer.removeEventListener('scroll',scrollCallback);


    
  },[]) 
  return (
    <div className={"home transition-[top] fixed left-0  flex px-0 lg:px-6 w-full  md:justify-between "+(headerHidden? "top-0":'top-[4rem] lg:top-[6rem]')}>
        
        <Header header = {headerHidden}/>
        <EchoConfig />
        {/* <Messages/> */}
        {/* <ListMessages/> */}
        {/* <div className="lg:hidden phone fixed  dark:bg-black  bottom-0 left-0 right-0 w-full bg-white">
          <PhoneNav/>
        </div> */}

        <div className="left mt-6  min-w-fit left-0 w-[20vw] hidden lg:block">
          <LeftNav/>
          {/* <LeftNavBottom/> */}
        </div>
        <div className={"center flex transition-[top] duration-1000 flex-col   w-[100vw]  lg:w-[60vw] "+(headerHidden? 'h-[100vh]':'h-[calc(100vh-5rem)] mt-6 lg:h-[calc(100vh-8rem)]')}>
          {/* <h1>ello</h1> */}
          <div ref={scrollContainerRef} className="out grow overflow-y-auto">
            <Outlet/>
            
          </div>
          <div className={"navphone transition-transform  lg:hidden  "+(headerHidden? 'translate-y-[5rem] h-0':'')}>
            <PhoneNav/>

          </div>

        </div>
        <div className="right  mt-6 mx-3  right-0 w-[20vw] hidden lg:block">
          <RightNav/>    
        </div>
        
    </div>
  )
}

export default Home
