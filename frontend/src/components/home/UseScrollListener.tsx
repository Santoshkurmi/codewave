import { memo, useEffect, useRef } from "react"

interface Props{
    scrollContainerRef:React.RefObject<HTMLDivElement>,
    setHeaderHidden:React.Dispatch<React.SetStateAction<boolean>>
}

function UseScrollListener({scrollContainerRef,setHeaderHidden}:Props) {

  const previousTop = useRef(0);
    

    useEffect(()=>{
        // alert(isRightNavHidden)
        
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
    
    
        
      },[scrollContainerRef])
      
}

export default  UseScrollListener;