// import { useEffect, useState } from "react";
// import userStore from "../zustand/UserStore"
// import initialEcho from "./echoConfig";
// import Echo from "laravel-echo";



// export const useEcho = ()=>{
//     const {token} = userStore(state=>state.user);
//     const [echo,setEcho]= useState<Echo|null>(null);

//     useEffect(()=>{
//         if( echo==null && token ){
//             setEcho( initialEcho(token) )
//         }
//     },[token])

//     return echo;
// }