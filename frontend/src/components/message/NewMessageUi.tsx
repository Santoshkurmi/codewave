import React, { useEffect, useState } from 'react'
import ConfigStore from '../../zustand/ConfigStore';
import MessageProfile from './MessageProfile';
import Conversations from './Conversations';
import ListMessages from './ListMessages';
import { Outlet, useLocation } from 'react-router-dom';

function NewMessageUi() {
  const {setRightNav,setLeftNav,setHeaderNav} = ConfigStore();
  const location = useLocation();
  const isMessagesShown = location.pathname !='/messages';

  useEffect(()=>{
    setRightNav(true);
    setLeftNav(true);
    // setHeaderNav(true);

    return ()=>{
        setRightNav(false);
    setLeftNav(false);
    }
  },[])


  return (
    <div className='flex mx-4 gap-5 h-full'>

        <div className={"profiles  rounded-lg bg-gray-100 dark:bg-gray-900 w-[100%] lg:w-[30%] "+(isMessagesShown && "hidden lg:block")}>
            <Conversations/>
        </div>

        
        <div className={"messages rounded-lg bg-gray-100 dark:bg-gray-900 flex-grow w-[70%] "+(!isMessagesShown && 'hidden lg:block')}>
            {/* <ListMessages /> */}
        
          {
           isMessagesShown ? <Outlet/>
           : <div 
           className="showMsgHint text-3xl flex items-center justify-center w-full h-full">
            Start conversation here
            </div>

          }
        </div>
    </div>
  )
}

export default NewMessageUi