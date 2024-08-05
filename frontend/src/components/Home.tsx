import { useEffect } from "react"
import Feeds from "./feed/Feeds"
import Header from "./navigations/Header"
import LeftNav from "./navigations/LeftNav"
import LeftNavBottom from "./navigations/LeftNavBottom"
import PhoneNav from "./navigations/PhoneNav"
import RightNav from "./navigations/RightNav"
import { getToken } from "../axios/tokens"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Home() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(getToken() ==null) navigate('/login')
    
  },[]) 
  return (
    <div className="home  mt-[6rem] flex mx-6 justify-end md:justify-center">
        <Header/>
        {/* <Messages/> */}
        {/* <ListMessages/> */}
        <div className="sm:hidden phone fixed bottom-0 left-0 right-0 w-full bg-white">
          <PhoneNav/>
        </div>
        <div className="left fixed min-w-fit left-0 w-[20vw] hidden sm:block">
          <LeftNav/>
          <LeftNavBottom/>
        </div>
        <div className="center w-[95vw] sm:w-[70vw] md:w-[60vw] ">
          <Feeds/>    
        </div>
        <div className="right m-3  fixed right-0 w-[20vw] hidden md:block">
          <RightNav/>    
        </div>
        
    </div>
  )
}

export default Home