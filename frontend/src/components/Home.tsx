import Feeds from "./feed/Feeds"
import Header from "./navigations/Header"
import LeftNav from "./navigations/LeftNav"
import LeftNavBottom from "./navigations/LeftNavBottom"
import RightNav from "./navigations/RightNav"

function Home() {
  return (
    <div className="home  mt-[6rem] flex mx-6 justify-center">
        <Header/>
        <div className="left fixed left-0">
          <LeftNav/>
          <LeftNavBottom/>
        </div>
        <div className="center">
          <Feeds/>    
        </div>
        <div className="right fixed right-0">
          <RightNav/>    
        </div>
        
    </div>
  )
}

export default Home