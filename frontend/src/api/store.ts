import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import userReducer from "./userSlice";


export const store = configureStore({
    reducer:{
        [api.reducerPath]:api.reducer,
        user:userReducer
    },
    middleware:(getDefaultMiddlewares)=>getDefaultMiddlewares().concat(api.middleware)
})