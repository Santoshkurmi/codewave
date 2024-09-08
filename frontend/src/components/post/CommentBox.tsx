import React, { useState } from 'react'
import { Comment } from '../../api/apiSlice'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../zustand/AuthStore';
import { formatDate } from '../../helpers/DateTimeConverter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerbyte } from '@fortawesome/free-brands-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';

function CommentBox(comment: Comment) {

    const profile_pic = comment.user.profile?.profile_pic;
    const { user_id, content, created_at, user } = comment;
    const navigate = useNavigate();
    const [isPopup, setIsPopup] = useState(false);
    const logined_user_id = useAuthStore().user?.id;
    return (

        <div className="px-10 dark:bg-black bg-white w-[80vw] ">
            <div className="mb-10  select-text relative dark:shadow-gray-600 border dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">


                <div className="user relative flex gap-5 items-center w-full ">
                    {
                        profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
                    }
                    <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer text-2xl name font-bold dark:text-slate-300 text-gray-700">{user.name}</div>
                    <div className="cursor-pointer name  dark:text-slate-300 text-gray-700">Commented in {formatDate(created_at)}</div>
                    {/* <div className="cursor-pointer name  dark:text-slate-300 text-gray-700">Updated in {formatDate(updated_at)}</div> */}
                    <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
                    {

                        isPopup && <div className="z-50 select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
                            <ul>
                                {
                                    user_id == logined_user_id ? <li className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Delete</li> : null
                                }

                                {/* {
                                    user_id == logined_user_id ? <li className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Edit</li> : null
                                } */}

                                {/* <li onClick={() => setIsPopup(false)} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Save</li> */}

                            </ul>
                        </div>



                    }
                </div>


                <div className="description text-2xl dark:text-slate-300 ">
                    {content}
                </div>





            </div>




        </div>
    )
}

export default CommentBox