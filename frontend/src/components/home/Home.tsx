import { useEffect, useMemo, useRef, useState } from "react"
import Header from "../navigations/Header"
import LeftNav from "../navigations/LeftNav"
import PhoneNav from "../navigations/PhoneNav"
import RightNav from "../navigations/RightNav"
import { Outlet } from "react-router-dom"
import EchoConfig from "../../echo/echoConfig"
import ConfigStore from "../../zustand/ConfigStore"
import UseScrollListener from "./UseScrollListener"
import useAuthStore from "../../zustand/AuthStore"

function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [headerHidden, setHeaderHidden] = useState(false);
  const { isRightNavHidden, isHeaderNavHidden, isLeftNavHidden, } = ConfigStore();


  UseScrollListener({ scrollContainerRef, setHeaderHidden });

  return (
    <div className={"home  transition-['top']  left-0  flex px-0  w-full  flex-col " + (headerHidden || isHeaderNavHidden ? "-translate-y-[6rem]" : '')}>

      <Header/>
      <EchoConfig />


      <div className="body dark:bg-black flex w-full justify-between">

        <div className={"left mt-6  min-w-fit left-0 w-[20vw] hidden " + (isLeftNavHidden ? " " : "lg:block")}>
          <LeftNav />
        </div>
        
        <div className={"center flex transition-[top] grow  duration-1000 flex-col   w-[100vw]   " + (isRightNavHidden && isLeftNavHidden ? ' lg:w-[100vw] ' : (isRightNavHidden ? ' lg:w-[80vw] ' : ' lg:w-[60vw] ')) + (headerHidden || isHeaderNavHidden ? ' h-[100vh]' : 'h-[calc(100vh-5rem)] mt-6 lg:h-[calc(100vh-8rem)]')}>
          <div ref={scrollContainerRef} className="out grow overflow-y-auto">
            <Outlet />

          </div>
          <div className={"navphone transition-transform  lg:hidden  " + (headerHidden ? 'translate-y-[5rem] h-0' : '')}>
            <PhoneNav />

          </div>

        </div>
        <div className={"right  mt-6 mx-3  right-0  hidden  " + (isRightNavHidden ? 'w-[0] hidden' : 'w-[20vw] lg:block')}>
          <RightNav />
        </div>
      </div>




    </div>
  )
}

export default Home
