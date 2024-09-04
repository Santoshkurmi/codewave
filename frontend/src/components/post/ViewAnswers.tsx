import { useEffect, useMemo, useState } from "react";
import ConfigStore from "../../zustand/ConfigStore";
import userStore from "../../zustand/UserStore"
import { useNavigate, useParams } from "react-router-dom";
import { useCastVoteMutation, useDeletePostMutation, useGetPostQuery } from "../../api/apiSlice";
import { formatDate } from "../../helpers/DateTimeConverter";
import MarkdownShower from "../markdown/MarkdownShower";
import { getUser } from "../../axios/tokens";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPerson } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import AddPost from "../add_post/AddPost";


function ViewAnswers() {
    const { setLeftNav, setRightNav } = ConfigStore();
    const { post_id } = useParams();
    const logined_user_id = useMemo(() => getUser(), []);

    const { isError, isSuccess, isLoading, data: posts } = useGetPostQuery({ post_id });
    const [isPopup, setIsPopup] = useState(false);
    const [castVote] = useCastVoteMutation();
    const [deletePost,] = useDeletePostMutation();

    const navigate = useNavigate();

    useEffect(() => {
        setLeftNav(true);
        setRightNav(true);

        return () => { setLeftNav(false); setRightNav(false); }
    }, []);

    if (isLoading) return <div>Loading please wait...</div>
    if (isError) return <div>Something went wrong fetching the post.</div>
    if (!isSuccess) return <div>Got the data</div>
    const { user, created_at, content, user_id, id, down_count, up_count, view_count } = posts;
    const profile_pic = user.profile?.profile_pic ?? null;



    console.log(posts);
    return (

        <div className="h-[95vh] px-10 dark:bg-black bg-white w-[100vw] ">
            <div className="mb-10  select-text relative dark:shadow-gray-600 border dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">




                <div className="user relative flex gap-5 items-center w-full ">
                    {
                        profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
                    }
                    <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer name font-bold dark:text-slate-300 text-gray-700">{user.name}</div>
                    <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
                    {

                        isPopup ? <div className="z-50 select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
                            <ul>
                                {
                                    user_id == logined_user_id ? <li onClick={() => { deletePost({ post_id }); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Delete</li> : null
                                }

                                {
                                    user_id == logined_user_id ? <li onClick={() => { navigate('/update_post/' + post_id); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Edit</li> : null
                                }

                                <li onClick={() => setIsPopup(false)} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Save</li>

                            </ul>
                        </div>

                            : null

                    }
                </div>

                <div className="title-time flex justify-between">
                    <div className="title font-bold dark:text-slate-300 text-xl text-gray-700"></div>
                    <div className="time dark:text-slate-300">{formatDate(created_at)}</div>
                </div>
                <div className="description dark:text-slate-300 text-lg">



                    <MarkdownShower text={content} isPreview={true} />


                </div>





            </div>

            <div className="select-none dark:text-slate-300 vote_views flex justify-between">

                <div className="voting flex gap-6">
                    <div onClick={() => castVote({ vote_type: '1', post_id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {up_count}</div>
                    <div onClick={() => castVote({ vote_type: '-1', post_id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {down_count}</div>
                </div>
                {/* <div className="answers cursor-pointer" onClick={() => navigate("/post/" + post_id)}>Answers</div> */}

                <div className="views"><FontAwesomeIcon icon={faEye} /> {view_count}</div>
            </div>



            {/* //adding many more */}

            <div className="mb-10  select-text relative dark:shadow-gray-600  dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">




                <div className="user relative flex gap-5 items-center w-full ">
                    {
                        profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
                    }
                    <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer name font-bold dark:text-slate-300 text-gray-700">{user.name}</div>
                    <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
                    {

                        isPopup ? <div className="z-50 select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
                            <ul>
                                {
                                    user_id == logined_user_id ? <li onClick={() => { deletePost({ post_id }); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Delete</li> : null
                                }

                                {
                                    user_id == logined_user_id ? <li onClick={() => { navigate('/update_post/' + post_id); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Edit</li> : null
                                }

                                <li onClick={() => setIsPopup(false)} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Save</li>

                            </ul>
                        </div>

                            : null

                    }
                </div>

                <div className="title-time flex justify-between">
                    <div className="title font-bold dark:text-slate-300 text-xl text-gray-700"></div>
                    <div className="time dark:text-slate-300">{formatDate(created_at)}</div>
                </div>
                <div className="description dark:text-slate-300 text-lg">



                    <MarkdownShower text={content} isPreview={true} />


                </div>





            </div>

            <div className="select-none dark:text-slate-300 vote_views flex justify-between">

                <div className="voting flex gap-6">
                    <div onClick={() => castVote({ vote_type: '1', post_id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {up_count}</div>
                    <div onClick={() => castVote({ vote_type: '-1', post_id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {down_count}</div>
                </div>
                {/* <div className="answers cursor-pointer" onClick={() => navigate("/post/" + post_id)}>Answers</div> */}

                <div className="views"><FontAwesomeIcon icon={faEye} /> {view_count}</div>
            </div>

            <div className="mb-10  select-text relative dark:shadow-gray-600  dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">




<div className="user relative flex gap-5 items-center w-full ">
    {
        profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
    }
    <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer name font-bold dark:text-slate-300 text-gray-700">{user.name}</div>
    <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
    {

        isPopup ? <div className="z-50 select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
            <ul>
                {
                    user_id == logined_user_id ? <li onClick={() => { deletePost({ post_id }); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Delete</li> : null
                }

                {
                    user_id == logined_user_id ? <li onClick={() => { navigate('/update_post/' + post_id); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Edit</li> : null
                }

                <li onClick={() => setIsPopup(false)} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Save</li>

            </ul>
        </div>

            : null

    }
</div>

<div className="title-time flex justify-between">
    <div className="title font-bold dark:text-slate-300 text-xl text-gray-700"></div>
    <div className="time dark:text-slate-300">{formatDate(created_at)}</div>
</div>
<div className="description dark:text-slate-300 text-lg">



    <MarkdownShower text={content} isPreview={true} />


</div>





</div>

<div className="select-none dark:text-slate-300 vote_views flex justify-between">

<div className="voting flex gap-6">
    <div onClick={() => castVote({ vote_type: '1', post_id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {up_count}</div>
    <div onClick={() => castVote({ vote_type: '-1', post_id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {down_count}</div>
</div>
{/* <div className="answers cursor-pointer" onClick={() => navigate("/post/" + post_id)}>Answers</div> */}

<div className="views"><FontAwesomeIcon icon={faEye} /> {view_count}</div>
</div>

<div className="mb-10  select-text relative dark:shadow-gray-600  dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">




<div className="user relative flex gap-5 items-center w-full ">
    {
        profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
    }
    <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer name font-bold dark:text-slate-300 text-gray-700">{user.name}</div>
    <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
    {

        isPopup ? <div className="z-50 select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
            <ul>
                {
                    user_id == logined_user_id ? <li onClick={() => { deletePost({ post_id }); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Delete</li> : null
                }

                {
                    user_id == logined_user_id ? <li onClick={() => { navigate('/update_post/' + post_id); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Edit</li> : null
                }

                <li onClick={() => setIsPopup(false)} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Save</li>

            </ul>
        </div>

            : null

    }
</div>

<div className="title-time flex justify-between">
    <div className="title font-bold dark:text-slate-300 text-xl text-gray-700"></div>
    <div className="time dark:text-slate-300">{formatDate(created_at)}</div>
</div>
<div className="description dark:text-slate-300 text-lg">



    <MarkdownShower text={content} isPreview={true} />


</div>





</div>

<div className="select-none dark:text-slate-300 vote_views flex justify-between">

<div className="voting flex gap-6">
    <div onClick={() => castVote({ vote_type: '1', post_id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {up_count}</div>
    <div onClick={() => castVote({ vote_type: '-1', post_id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {down_count}</div>
</div>
{/* <div className="answers cursor-pointer" onClick={() => navigate("/post/" + post_id)}>Answers</div> */}

<div className="views"><FontAwesomeIcon icon={faEye} /> {view_count}</div>
</div>

<div className="mb-10  select-text relative dark:shadow-gray-600  dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">




<div className="user relative flex gap-5 items-center w-full ">
    {
        profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
    }
    <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer name font-bold dark:text-slate-300 text-gray-700">{user.name}</div>
    <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
    {

        isPopup ? <div className="z-50 select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
            <ul>
                {
                    user_id == logined_user_id ? <li onClick={() => { deletePost({ post_id }); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Delete</li> : null
                }

                {
                    user_id == logined_user_id ? <li onClick={() => { navigate('/update_post/' + post_id); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Edit</li> : null
                }

                <li onClick={() => setIsPopup(false)} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Save</li>

            </ul>
        </div>

            : null

    }
</div>

<div className="title-time flex justify-between">
    <div className="title font-bold dark:text-slate-300 text-xl text-gray-700"></div>
    <div className="time dark:text-slate-300">{formatDate(created_at)}</div>
</div>
<div className="description dark:text-slate-300 text-lg">



    <MarkdownShower text={content} isPreview={true} />


</div>





</div>

<div className="select-none dark:text-slate-300 vote_views flex justify-between">

<div className="voting flex gap-6">
    <div onClick={() => castVote({ vote_type: '1', post_id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {up_count}</div>
    <div onClick={() => castVote({ vote_type: '-1', post_id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {down_count}</div>
</div>
{/* <div className="answers cursor-pointer" onClick={() => navigate("/post/" + post_id)}>Answers</div> */}

<div className="views"><FontAwesomeIcon icon={faEye} /> {view_count}</div>
</div>

<div className="mb-10  select-text relative dark:shadow-gray-600  dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">




<div className="user relative flex gap-5 items-center w-full ">
    {
        profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
    }
    <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer name font-bold dark:text-slate-300 text-gray-700">{user.name}</div>
    <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
    {

        isPopup ? <div className="z-50 select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
            <ul>
                {
                    user_id == logined_user_id ? <li onClick={() => { deletePost({ post_id }); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Delete</li> : null
                }

                {
                    user_id == logined_user_id ? <li onClick={() => { navigate('/update_post/' + post_id); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Edit</li> : null
                }

                <li onClick={() => setIsPopup(false)} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Save</li>

            </ul>
        </div>

            : null

    }
</div>

<div className="title-time flex justify-between">
    <div className="title font-bold dark:text-slate-300 text-xl text-gray-700"></div>
    <div className="time dark:text-slate-300">{formatDate(created_at)}</div>
</div>
<div className="description dark:text-slate-300 text-lg">



    <MarkdownShower text={content} isPreview={true} />


</div>





</div>

<div className="select-none dark:text-slate-300 vote_views flex justify-between">

<div className="voting flex gap-6">
    <div onClick={() => castVote({ vote_type: '1', post_id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {up_count}</div>
    <div onClick={() => castVote({ vote_type: '-1', post_id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {down_count}</div>
</div>
{/* <div className="answers cursor-pointer" onClick={() => navigate("/post/" + post_id)}>Answers</div> */}

<div className="views"><FontAwesomeIcon icon={faEye} /> {view_count}</div>
</div>

<div className="mb-10  select-text relative dark:shadow-gray-600  dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">




<div className="user relative flex gap-5 items-center w-full ">
    {
        profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
    }
    <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer name font-bold dark:text-slate-300 text-gray-700">{user.name}</div>
    <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
    {

        isPopup ? <div className="z-50 select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
            <ul>
                {
                    user_id == logined_user_id ? <li onClick={() => { deletePost({ post_id }); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Delete</li> : null
                }

                {
                    user_id == logined_user_id ? <li onClick={() => { navigate('/update_post/' + post_id); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Edit</li> : null
                }

                <li onClick={() => setIsPopup(false)} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Save</li>

            </ul>
        </div>

            : null

    }
</div>

<div className="title-time flex justify-between">
    <div className="title font-bold dark:text-slate-300 text-xl text-gray-700"></div>
    <div className="time dark:text-slate-300">{formatDate(created_at)}</div>
</div>
<div className="description dark:text-slate-300 text-lg">



    <MarkdownShower text={content} isPreview={true} />


</div>





</div>

<div className="select-none dark:text-slate-300 vote_views flex justify-between">

<div className="voting flex gap-6">
    <div onClick={() => castVote({ vote_type: '1', post_id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {up_count}</div>
    <div onClick={() => castVote({ vote_type: '-1', post_id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {down_count}</div>
</div>
{/* <div className="answers cursor-pointer" onClick={() => navigate("/post/" + post_id)}>Answers</div> */}

<div className="views"><FontAwesomeIcon icon={faEye} /> {view_count}</div>
</div>

<div className="mb-10  select-text relative dark:shadow-gray-600  dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">




<div className="user relative flex gap-5 items-center w-full ">
    {
        profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
    }
    <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer name font-bold dark:text-slate-300 text-gray-700">{user.name}</div>
    <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
    {

        isPopup ? <div className="z-50 select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
            <ul>
                {
                    user_id == logined_user_id ? <li onClick={() => { deletePost({ post_id }); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Delete</li> : null
                }

                {
                    user_id == logined_user_id ? <li onClick={() => { navigate('/update_post/' + post_id); setIsPopup(false); }} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Edit</li> : null
                }

                <li onClick={() => setIsPopup(false)} className="p-2 pl-2 active:dark:bg-gray-600 active:bg-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-lg">Save</li>

            </ul>
        </div>

            : null

    }
</div>

<div className="title-time flex justify-between">
    <div className="title font-bold dark:text-slate-300 text-xl text-gray-700"></div>
    <div className="time dark:text-slate-300">{formatDate(created_at)}</div>
</div>
<div className="description dark:text-slate-300 text-lg">



    <MarkdownShower text={content} isPreview={true} />


</div>





</div>

<div className="select-none dark:text-slate-300 vote_views flex justify-between">

<div className="voting flex gap-6">
    <div onClick={() => castVote({ vote_type: '1', post_id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {up_count}</div>
    <div onClick={() => castVote({ vote_type: '-1', post_id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {down_count}</div>
</div>
{/* <div className="answers cursor-pointer" onClick={() => navigate("/post/" + post_id)}>Answers</div> */}

<div className="views"><FontAwesomeIcon icon={faEye} /> {view_count}</div>
</div>





    <AddPost />



        </div>
    )
}

export default ViewAnswers