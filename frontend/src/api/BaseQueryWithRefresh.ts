import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import useAuthStore from '../zustand/AuthStore';
import { BASE_QUERY_PATH } from './constants';
import { toast } from 'react-toastify';

let isRefreshing = false;
let refreshPromise: any = null;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_QUERY_PATH,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = useAuthStore.getState().token; // Access the token from the auth state
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    return headers;
  },
});//baseQuery

const fetchPoint = async (api: any, extraOptions: any) => baseQuery(
  {
    url: '/refresh_token', // Your refresh token endpoint
    method: 'POST',
    body: {},
  },
  api,
  extraOptions
);

const BaseQueryWithRefresh = async (args: any, api: any, extraOptions: any) => {

  let result = await baseQuery(args, api, extraOptions);
  if (!result.error) return { data: result.data };

  if (result.error.status != 405) {
    // console.log(result.error.error) 
    // alert("hello")  
    toast.error((result.error as any).error.message + "");
    return { error: result.error };
  }


  // Try to refresh the token
  if (!isRefreshing) {
    isRefreshing = true;

    refreshPromise = fetchPoint(api, extraOptions)

    const refreshResult = await refreshPromise;

    if (refreshResult.error) {
      isRefreshing = false;
      //both access token and refresh token expired..
      if (refreshResult.error.status == 406) {
        useAuthStore.getState().setToken(null);
        useAuthStore.getState().setUser(null);

        return { error: result.error };
      }
      toast.error((refreshResult.error as any).message + "");
      return { error: result.error };;
    }



    // Store the new tokens
    setTimeout(() => isRefreshing = false, 20000)
    useAuthStore.getState().setToken((refreshResult.data as any)?.access_token ?? null);

  }//if  not refreshing

  await refreshPromise;
  result = await baseQuery(args, api, extraOptions);
  if (result.data) return { data: result.data };
  return { error: result.error };



};

export default BaseQueryWithRefresh;
