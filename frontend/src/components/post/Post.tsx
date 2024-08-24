import { faArrowDown, faArrowUp, faEye, faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { lazy, useCallback, useMemo, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown'
import { useNavigate } from "react-router-dom";
import { faUps } from "@fortawesome/free-brands-svg-icons";
import { api, useCastVoteMutation, useDeletePostMutation } from "../../api/apiSlice";
import { useDispatch } from "react-redux";
import { getUser } from "../../axios/tokens";
import { formatDate } from "../../helpers/DateTimeConverter";

// const ReactMarkdown = lazy(()=>import('react-markdown'));
// const SyntaxHighlighter = lazy(()=>import('react-syntax-highlighter'));

function Post({ user, created_at,content, user_id, id: post_id, down_count, up_count, view_count }: any) {

    //   return <div>{props.content}</div>
    const logined_user_id = useMemo(() => getUser(), []);
    const [castVote, { isLoading, isSuccess, isError }] = useCastVoteMutation();
   const [deletePost,{isLoading:isDeleting,isSuccess:isPostDeleted,isError:isDeleteError}] = useDeletePostMutation();
    const profile_pic = user.profile?.profile_pic ?? null;
    const navigate = useNavigate();
    const [isPopup, setIsPopup] = useState(false);



    return (
        <div className="mb-10 select-text relative dark:shadow-gray-600 border dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">

            {
                isLoading || isDeleting ? <div className="box absolute h-full w-full flex items-center justify-center">
                    <div className="spinner h-[100px] w-[100px]"></div>
                </div>
                    : null

            }
            <div className="user relative flex gap-5 items-center w-full ">
                {
                    profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
                }
                <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer name font-bold dark:text-slate-300 text-gray-700">{user.name}</div>
                <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
                {

                 isPopup?   <div className="select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
                        <ul>
                       {
                     user_id == logined_user_id ?   <li onClick={()=>{deletePost({post_id});setIsPopup(false);}} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Delete</li>  :null
                       } 

{
                     user_id == logined_user_id ?   <li onClick={()=>{navigate('/update_post/'+post_id);setIsPopup(false);}} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Edit</li>  :null
                       } 
                           
                       <li onClick={()=>setIsPopup(false)} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Save</li>
                            
                        </ul>
                    </div>

                    : null

                }
            </div>

            <div className="title-time flex justify-between">
                <div className="title font-bold dark:text-slate-300 text-xl text-gray-700">{"Title will be here"}</div>
                <div className="time dark:text-slate-300">{formatDate(created_at)}</div>
            </div>
            <div className="description dark:text-slate-300 text-lg">
                <ReactMarkdown children={content} components={{
                    code(props) {
                        const { children, className, node, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            style={docco}
                            className="!rounded-lg !p-4"
                        />
                            : <code {...rest} className={className}>{children}</code>

                    }
                }} />
            </div>
            {/* <div className="code p-3 dark:text-slate-300 dark:bg-gray-500 bg-gray-300 rounded-lg">
            {props.code}
        </div> */}
            <div className="select-none dark:text-slate-300 vote_views flex justify-between">
                <div onClick={() => castVote({ vote_type: '1', post_id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {up_count}</div>
                <div onClick={() => castVote({ vote_type: '-1', post_id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {down_count}</div>
                <div className="views"><FontAwesomeIcon icon={faEye} /> {view_count}</div>
            </div>
        </div>
    )
}

export default Post