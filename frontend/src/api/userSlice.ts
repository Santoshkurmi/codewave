import { createSlice } from "@reduxjs/toolkit/react";
import { useDispatch } from "react-redux";

type user = {
    id:number,
    name:string,
    email:string,
    username:string,
    password:string,
}

// const dispatch = useDispatch();


const initialUserState = {
    user:getUserLocal()
}

function setUserLocal(user:any){
    localStorage.setItem('user',JSON.stringify(user));
}
function getUserLocal(){
    var user =  localStorage.getItem('user');
    if(user) return JSON.parse(user);
    else return null;
}
function removeUserLocal(){
    localStorage.clear();
}


const userSlice = createSlice({
    name:'user',
    initialState:initialUserState,
    reducers:{
        setUser:(state,action)=>{
            setUserLocal(action.payload)
            state.user = action.payload;
        },//setUser
        removeUser:(state)=>{
            state.user = null;
            removeUserLocal();
        }//removeUser
    }
})//creteSlice
export const {removeUser,setUser} = userSlice.actions;
export default userSlice.reducer;