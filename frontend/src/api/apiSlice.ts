import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken, getUser } from "../axios/tokens";
import userStore from "../zustand/UserStore";


interface User {
    id: number,
    name: string,
    email: string,
    username: string,
}

interface Conversation {
    conversation_id: number,
    user: User
}

interface Message {
    id: number,
    text: string,
    user_id: number,
    conversation_id: number,
    updated_at: string,
    created_at: string
}
interface MessagePayLoad {
    user: User,
    isNoMoreMsg?:boolean,
    messages: Message[]
}
interface MessageSend {
    user_id: number,
    text: string,
    last_msg_id?:number
}
interface MessageGet{
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
        baseQuery: fetchBaseQuery({ 
        prepareHeaders(headers, api) {
            headers.set('Authorization','Bearer ' + getToken());
            
        },baseUrl: "http://localhost:8000/api/v1/" }),
        tagTypes: ['Conversation', 'Message', 'User','Profile','Post'],
        endpoints: (builder) => ({
            getConversations: builder.query<Conversation[], void>({
                query: () => ({ url: '/conversations', method: 'POST', body: {} }),
                providesTags: ['Conversation'],
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),//getConversation

            getMessages: builder.query<MessagePayLoad, number>({

                query: (user_id) => ({ url: '/messages', body: { user_id }, method: 'POST' }),
                providesTags: ['Message'],
                transformResponse: (response: any) => {
                    response.data.messages.reverse();
                    if(response.data.messages.length==0) response.data.isNoMoreMsg = true;
                    return response.data;
                }
            }),//getMEssages

            getPreviousMessages: builder.mutation<MessagePayLoad, MessageGet>({

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

            createPost:builder.mutation<any,any>({
                query:(postPayload)=>({url:'/create_post',body:postPayload,method:'POST'}),
                invalidatesTags:['Post'],
            
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),
            updatePost:builder.mutation<any,any>({
                query:(postPayload)=>({url:'/update_post',body:postPayload,method:'POST'}),
                invalidatesTags:['Post'],
            
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),
          
            increaseView:builder.mutation<any,any>({
                query:(viewPayload)=>({url:'/increase_post_view',body:viewPayload,method:'POST'}),
                invalidatesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),
            deletePost:builder.mutation<any,any>({
                query:(deletePayload)=>({url:'/delete_post',body:deletePayload,method:'POST'}),
                invalidatesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response)
                    return response.data;
                }
            }),
            castVote:builder.mutation<any,any>({
                query:(votePayload)=>({url:'/vote_post',body:votePayload,method:'POST'}),
                invalidatesTags:['Post'],
                transformResponse: (response: any) => {
                    console.log(response);
                    return response.data;
                }
            }),
            getPost:builder.query<any,any>({
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
                                text: msg.text,
                                user_id: Number(getUser()),
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

            getUserProfile: builder.query<any, number|string>({
                query: (user_id:number) => ({ url: '/get_user_profile', body: {user_id:user_id}, method: "POST" }),
                providesTags: ['Profile'],
                transformResponse: (response: any) => { return response.data; }

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

            }),

            logout: builder.mutation<void, void>({
                query: () => ({ url: '/logout', body: {}, method: "POST" }),
                invalidatesTags: ['Conversation', 'User', 'Message'],
                transformResponse: (response: any) => {
                    userStore().setUser({});
                    return response;
                }
            }),

        })//endpoint
    }
);//createAPi

export const { useUpdatePostMutation,useDeletePostMutation,useCreatePostMutation,useIncreaseViewMutation,useGetPostQuery,useCastVoteMutation,useUpdateBioMutation,useUploadCoverPicMutation,useGetUserProfileQuery,useUploadProfilePicMutation,useGetConversationsQuery,useGetPreviousMessagesMutation, useGetMessagesQuery, useSendMessageMutation, useGetUsersQuery, useLogoutMutation } = api;