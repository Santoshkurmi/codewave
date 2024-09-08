import { useState } from "react"
import api from "../axios/api"
import userStore from "../zustand/UserStore"
import { toast } from "react-toastify"
import useAuthStore from "../zustand/AuthStore"


function useLogout() {
    const {setToken,setUser} = useAuthStore();
    const [loading,setLoading] = useState(false)
    // const setUser = userStore().setUser

   async function logout(){
        const {res,errors} =await api.send("/logout",{})
        if(errors==null){
           setUser(null)
           setToken(null); 
           toast.success(res.msg,{position:'top-center',autoClose:1000})
           return;
        }//

        // toast.error(errors.default,{position:'top-center',autoClose:2000})

    }//logout

    return {logout,loading}
}

export default useLogout