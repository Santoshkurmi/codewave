import React, { useState } from 'react'
import { Answer, useCastVoteMutation, useDeletePostMutation, usePostCommentMutation } from '../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../zustand/AuthStore';
import MarkdownShower from '../markdown/MarkdownShower';
import { formatDate } from '../../helpers/DateTimeConverter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPerson } from '@fortawesome/free-solid-svg-icons';
import AddAnswer from './AddAnswer';
import CommentBox from './CommentBox';

function AnswerBox(answer: Answer) {

    const navigate = useNavigate();
    const profile_pic = answer.user.profile?.profile_pic
    const { post_id, user_id, comments, markdown, created_at } = answer;
    const logined_user_id = useAuthStore().user?.id;
    const [castVote] = useCastVoteMutation();
    const [deletePost,] = useDeletePostMutation();
    const [isPopup, setIsPopup] = useState(false);
    const [postComment] = usePostCommentMutation();
    const [commentText, setCommentText] = useState('');
    const [isCommentWriting, setCommentWriting] = useState(false);

    function handleComment(e: any) {
        e.preventDefault();
        postComment({ answer_id: answer.id, content: commentText });
        setCommentText('');
        setCommentWriting(false);
    }

    return (
        <div className=" px-10 dark:bg-black bg-white w-[90vw] ">
            <div className="mb-10 w-full  select-text relative dark:shadow-gray-600 border dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">


                <div className="user relative flex gap-5 items-center w-full ">
                    {
                        profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
                    }
                    <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer text-2xl name font-bold dark:text-slate-300 text-gray-700">{answer.user.name}</div>
                    <div className="cursor-pointer name  dark:text-slate-300 text-gray-700">Replied in {formatDate(created_at)}</div>
                    {/* <div className="cursor-pointer name  dark:text-slate-300 text-gray-700">Updated in {formatDate(updated_at)}</div> */}
                    <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
                    {

                        isPopup && <div className="z-50 select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
                            <ul>
                                {
                                    user_id == logined_user_id ? <li onClick={() => { deletePost({ post_id }); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Delete</li> : null
                                }

                                {/* {
                            user_id == logined_user_id ? <li onClick={() => { navigate('/update_post/' + post_id); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Edit</li> : null
                        } */}

                                {/* <li onClick={() => setIsPopup(false)} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Save</li> */}

                            </ul>
                        </div>



                    }
                </div>


                <div className="description dark:text-slate-300 text-lg">

                    


                    <MarkdownShower text={markdown} isPreview={true} />

                    <div className="select-none mt-4 dark:text-slate-300 vote_views flex justify-between">

                        <div className="voting flex gap-6">
                            <div onClick={() => castVote({ vote_type: '1', answer_id:answer.id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {answer.up_count}</div>
                            <div onClick={() => castVote({ vote_type: '-1', answer_id:answer.id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {answer.down_count}</div>
                        </div>
                        {/* <div className="answers cursor-pointer" onClick={() => navigate("/post/" + post_id)}>Answers</div> */}

                    </div>



                    <div className="comments flex mt-2 gap-3 flex-col items-end">
                        {
                            comments.length > 0 && <div className="div text-xl font-bold self-start">Comments</div>
                        }

                        {
                            comments.map(comment => {
                                return <CommentBox {...comment} key={comment.id} />
                            })
                        }
                    </div>



                </div>



                <div className="select-none dark:text-slate-300 vote_views flex justify-between">

                    <button onClick={() => setCommentWriting(!isCommentWriting)} className="reply bg-blue-500 rounded-lg px-4 mt-5 py-3 text-white">Provide Comment</button>



                    {/* <div className="voting flex gap-6">
                <div onClick={() => castVote({ vote_type: '1', post_id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {up_count}</div>
                <div onClick={() => castVote({ vote_type: '-1', post_id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {down_count}</div>
            </div> */}
                    {/* <div className="answers cursor-pointer" onClick={() => navigate("/post/" + post_id)}>Answers</div> */}

                    {/* <div className="views"><FontAwesomeIcon icon={faEye} /> {view_count}</div> */}
                </div>
                {
                    isCommentWriting &&
                    <form className="commentText w-full flex justify-between items-center gap-5 ">
                        <input value={commentText} onChange={(e) => setCommentText(e.target.value)} className="text w-full text-2xl outline py-8 px-10w-full bg-gray-200 dark:bg-gray-600 p-3 my-4 rounded-md" placeholder='Enter comment' />

                        <input onClick={(e) => handleComment(e)} type="submit" className='bg-blue-600 rounded-lg px-4 py-3 text-white' value="send" />
                    </form>
                }




            </div>


            {/* <div className="answer Count text-3xl font-bold my-5">There are 0 answers</div> */}






        </div>
    )
}

export default AnswerBox