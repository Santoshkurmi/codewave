import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import userStore from "../zustand/UserStore";
import useAuthStore from "../zustand/AuthStore";
import axios from "axios";
import BaseQueryWithRefresh from "./BaseQueryWithRefresh";
import { toast } from "react-toastify";


interface Profile{
    id:number,
    user_id:number,
    bio?:string,
    cover_pic?:string,
    profile_pic?:string,
}


export interface User {
    id: number,
    name: string,
    email: string,
    username: string,
    profile?:Profile
}

interface Message {
    id: number,
    text: string,
    user_id: number,
    conversation_id: number,
    updated_at: string,
    created_at: string,
    is_markdown:boolean
}

export interface Post {
    id: number,
    content: string,
    user_id: number,
    view_count: number,
    updated_at: string,
    created_at: string,
    down_count:number,
    up_count:number,
    answer_count:number,
    user:User,
    comment:Comment[],
    answers:Answer[]
}
export interface Comment{
    id:number,
    content:string,
    user_id:number,
    answer_id:number,
    created_at:string,
    updated_at:string,
    user:User
}

export interface Answer{
    id:number,
    markdown:string,
    user_id:number,
    post_id:number,
    down_count:number,
    up_count:number,
    user:User,
    created_at:string,
    updated_at:string,
    comments:Comment[]
}

export interface Conversation{
    user_id:number,
    conversation_id:number,
    user:User,
    conversation:{
        is_group:boolean,
        profile?:string,
        title?:string,
        last_message?:Message
    }
    
}


//payload




interface MessagePayLoad {
    user: User,
    isNoMoreMsg?:boolean,
    messages: Message[]
}
interface MessageSend {
    user_id: number,
    text: string,
    is_markdown:boolean,
    // last_msg_id?:number
}
interface MessageGetPreviousPayload{
    user_id:number,
    is_after?:boolean,
    last_message_id:number
}


var currentId = -1;
function generateNew() {
    return currentId--;
}

export const api = createApi(
    {
        reducerPath: 'conversationApi',
        
        baseQuery:BaseQueryWithRefresh,
    
        tagTypes: ['Conversation', 'Message', 'User','Profile','Post'],

        endpoints: (builder) => ({

            logout: builder.mutation<void, void>({
                query: () => ({ url: '/logout', method: 'POST', body: {} }),
                invalidatesTags: ['Conversation','Message','User','Post','Profile'],
                transformResponse: (response: any) => {
                    console.log(response)
                    const message = response.message;
                    toast.success(message);
                    useAuthStore.getState().setToken(null)
                    useAuthStore.getState().setUser(null)
                    return response;
                },
                transformErrorResponse:(error)=>{
                    const message = (error.data as any)?.message
                    toast.error(message);
                }
            }),//logoout
            getConversations: builder.query<Conversation[], void>({
                query: () => ({ url: '/conversations', method: 'POST', body: {} }),
                providesTags: ['Conversation'],
                transformResponse: (response: any) => {
                    console.log('conversation',response)
                    return response.data;
                }
            }),//getConversation

            getMessages: builder.query<{messages:Message[],user:User,isNoMoreMsg:boolean}, number>({

                query: (user_id) => ({ url: '/messages', body: { user_id }, method: 'POST' }),
                providesTags: ['Message'],
                transformResponse: (response: any) => {
                    console.log('messages',response)
                    response.data.messages.reverse();
                    if(response.data.messages.length==0) response.data.isNoMoreMsg = true;
                    return response.data;
                }
            }),//getMEssages
            updateMessageView: builder.mutation<any, number>({

                query: (user_id) => ({ url: '/message/view', body: { user_id }, method: 'POST' }),
                // providesTags: ['Message'],
                // transformResponse: (response: any) => {
                //     console.log('messages',response)
                //     response.data.messages.reverse();
                //     if(response.data.messages.length==0) response.data.isNoMoreMsg = true;
                //     return response.data;
                // }
            }),//getMEssages

            getPreviousMessages: builder.mutation<{messages:Message[],user:User,isNoMoreMsg:boolean}, MessageGetPreviousPayload>({

                query: (msgQuery) => ({ url: '/messages', body: msgQuery, method: 'POST' }),
                // providesTags: ['Message'],
                transformResponse: (response: any,meta,abc) => {
                    // console.log("data form daa",response)
                    response.data.messages.reverse();
                    
                    return response.data;
                },
                async onQueryStarted(msgQuery,{dispatch,queryFulfilled}){
                        var res = await queryFulfilled
                        // console.log("Got data",res);
                        // res.data.data.messages.reverse();
                        dispatch(
                            api.util.updateQueryData('getMessages',msgQuery.user_id,(draft)=>{
                                if(res.data.messages.length==0) draft.isNoMoreMsg = true;
                                draft.messages = [...res.data.messages,...draft.messages];
                            })
                        )//dispatch
                }

                
            }),//getMEssages
            search:builder.query<any,string>({
                query:(query)=>({url:'/search?query='+query}),
                // invalidatesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),
            getNotifications:builder.query<any,void>({
                query:()=>({url:'/notifications'   }),
                // invalidatesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),
            similar:builder.query<any,{query:{data:string,id:number}}>({
                query:(query)=>({url:'/similar',method:"POST",body:query   }),
                // invalidatesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),

            createPost:builder.mutation<any,{content:string}>({
                query:(postPayload)=>({url:'/create_post',body:postPayload,method:'POST'}),
                invalidatesTags:['Post'],
            
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),
            updatePost:builder.mutation<any,{post_id:number,content:string}>({
                query:(postPayload)=>({url:'/update_post',body:postPayload,method:'POST'}),
                invalidatesTags:['Post'],
            
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),
          
            increaseView:builder.mutation<any,{post_id:number}>({
                query:(viewPayload)=>({url:'/increase_post_view',body:viewPayload,method:'POST'}),
                invalidatesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),
            deletePost:builder.mutation<any,{post_id:number}>({
                query:(deletePayload)=>({url:'/delete_post',body:deletePayload,method:'POST'}),
                invalidatesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),
            castVote:builder.mutation<any,{post_id?:number,answer_id?:number,vote_type:'1'|'-1'}>({
                query:(votePayload)=>({url:'/vote',body:votePayload,method:'POST'}),
                invalidatesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response);
                    return response.data;
                }
            }),
            postAnswer:builder.mutation<Answer,{post_id:number,markdown:string}>({
                query:(votePayload)=>({url:'/post_answer',body:votePayload,method:'POST'}),
                invalidatesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response);
                    return response.data;
                }
            }),
            postComment:builder.mutation<Comment,{answer_id:number,content:string}>({
                query:(votePayload)=>({url:'/post_comment',body:votePayload,method:'POST'}),
                invalidatesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response);
                    return response.data;
                }
            }),
            getRecommend:builder.query<Post,void>({
                query:(getPostPayload)=>({url:'/recommend',body:getPostPayload,method:'GET'}),
                providesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),
            getPost:builder.query<Post,{post_id?:number,user_id?:number,all:true}>({
                query:(getPostPayload)=>({url:'/posts',body:getPostPayload,method:'POST'}),
                providesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            })
            ,

            sendMessage: builder.mutation<MessagePayLoad, MessageSend>({
                query: (msgObj) => ({ url: '/message/send', body: msgObj, method: 'POST' }),
                // providesTags:['Message'],
                // invalidatesTags:['Message'],
                async onQueryStarted(msg, { dispatch, queryFulfilled }) {

                    // var id = uuid() ;
                    var id = generateNew();
                    const patchResult = dispatch(
                        api.util.updateQueryData('getMessages', msg.user_id, (draft) => {
                            // console.log("Starting dispatch");
                            
                            draft.messages.push({
                                id: id,
                                is_markdown:msg.is_markdown,
                                text: msg.text,
                                user_id: useAuthStore.getState().user?.id ?? -100,
                                conversation_id: -1,
                                updated_at: '',
                                created_at: ''
                            })//push

                        })//update
                    );//dispathc
                    // queryFulfilled.catch(patchResult.undo);
                    try {
                        var { data } = await queryFulfilled;
                        // prom.data
                        // if (data)
                            dispatch<any>(
                                api.util.updateQueryData('getMessages', msg.user_id, (draft) => {


                                    var index: number = draft.messages.findLastIndex((msgA) => msgA.id == id && msgA.text == msg.text);
                                    console.log(index, id)
                                    if (index > -1) {

                                        (draft as any).messages[index] = data;
                                    }//if found
                                })
                            );//dispatch
                        // else
                          


                    }
                    catch {
                        // console.log("Error occured in apiSlice")

                        dispatch<any>(
                            api.util.updateQueryData('getMessages', msg.user_id, (draft) => {


                                var index: number = draft.messages.findLastIndex((msgA) => msgA.id == id && msgA.text == msg.text);
                                console.log(index, id)
                                if (index > -1) {

                                    draft.messages[index].conversation_id = 0;
                                }//if found
                            })
                        );//dispatch

                        // patchResult.undo();
                    }

                    //   queryFulfilled.catch( patchResult.undo )

                },
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),//sendMessage

            getUsers: builder.query<User[], void>({
                query: () => ({ url: '/users', body: {}, method: "POST" }),
                providesTags: ['User'],
                transformResponse: (response: any) => { return response.data; }

            }),//getUsers

            getUserProfile: builder.query<User,number|null | undefined  >({
                query: (user_id) => ({ url: '/get_user_profile', body: {user_id}, method: "POST" }),
                providesTags: ['Profile'],
                transformResponse: (response:{data:User},meta,user_id) => { 
                    if(user_id==null){
                        // alert("doign it now");
                        useAuthStore.getState().setUser(response.data);
                    }
                    return response.data; 
                }

            }),//getUsers

            uploadProfilePic:builder.mutation({
                query:(formData:FormData)=> ({url:'/upload_profile_pic',body:formData,method:"POST"}),
                transformResponse:(response:any)=>{return response.data;},
                invalidatesTags:['Profile']
            }),
            uploadCoverPic:builder.mutation({
                query:(formData:FormData)=> ({url:'/upload_cover_pic',body:formData,method:"POST"}),
                transformResponse:(response:any)=>{return response.data;},
                invalidatesTags:['Profile']

            }),

            updateBio:builder.mutation({
                query:(bio:string)=> ({url:'/update_bio',body:{bio:bio},method:"POST"}),
                transformResponse:(response:any)=>{return response.data;},
                invalidatesTags:['Profile']

            })

          

        })//endpoint
    }
);//createAPi

export const { useGetNotificationsQuery,useLazyGetNotificationsQuery,useLazySimilarQuery,useGetRecommendQuery,useLazySearchQuery,useUpdateMessageViewMutation,usePostAnswerMutation,usePostCommentMutation,useUpdatePostMutation,useDeletePostMutation,useCreatePostMutation,useIncreaseViewMutation,useGetPostQuery,useCastVoteMutation,useUpdateBioMutation,useUploadCoverPicMutation,useGetUserProfileQuery,useUploadProfilePicMutation,useGetConversationsQuery,useGetPreviousMessagesMutation, useGetMessagesQuery, useSendMessageMutation, useGetUsersQuery, useLogoutMutation } = api;