import { create } from "zustand";
import { User } from "../api/apiSlice";

interface Auth{
    user:User|null,
    setUser:(user:User|null)=>void,
    token:string|null,
    setToken:(token:string|null)=>void
}

function saveToken(token:string|null){
    if(token) localStorage.setItem("token",token);
    else localStorage.removeItem('token');
}
function getSavedToken(){
    return localStorage.getItem("token");
}


const useAuthStore = create<Auth>(set=>({
    user:null,
    token:getSavedToken(),
    setUser:(user)=>set({user}),
    setToken(token) {
        saveToken(token);
        set({ token });
    },

}))

export default useAuthStore;