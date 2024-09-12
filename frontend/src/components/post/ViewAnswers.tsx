import { useEffect, useMemo, useState } from "react";
import ConfigStore from "../../zustand/ConfigStore";
import { useNavigate, useParams } from "react-router-dom";
import { useCastVoteMutation, useDeletePostMutation, useGetPostQuery, useIncreaseViewMutation, useLazySearchQuery, useLazySimilarQuery } from "../../api/apiSlice";
import { formatDate } from "../../helpers/DateTimeConverter";
import MarkdownShower from "../markdown/MarkdownShower";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPerson } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import useAuthStore from "../../zustand/AuthStore";
import AddAnswer from "./AddAnswer";
import AnswerBox from "./AnswerBox";
import Post from "./Post";
import { SiIssuu } from "react-icons/si";


function ViewAnswers() {
    const { setLeftNav, setRightNav } = ConfigStore();
    const post_id = Number(useParams().post_id);
    const logined_user_id = useAuthStore().user?.id;

    const { isError, isSuccess, isLoading, data: posts } = useGetPostQuery({ post_id, all: true });
    const [isPopup, setIsPopup] = useState(false);
    const [castVote] = useCastVoteMutation();
    const [deletePost,] = useDeletePostMutation();
    const [increaseView] = useIncreaseViewMutation();
    const [recommend,{isError:isRecommError,isLoading:isRecommLoading,isSuccess:isRecommSuccess,data:recommended=[]}] = useLazySimilarQuery();

    const navigate = useNavigate();

    useEffect(() => {
        setLeftNav(true);
        setRightNav(true);

        const interval = setTimeout(()=>{
            increaseView({post_id});
        },10000);

        return () => { setLeftNav(false); setRightNav(false);clearTimeout(interval); }
    }, []);

    useEffect(()=>{
        // if(!isSuccess)return;
        if(posts?.content){
            recommend({query:{data:posts.content,id:posts.id}});
        }

    },[isSuccess,posts]);

    if (isLoading) return <div>Loading please wait...</div>
    if (isError) return <div>Something went wrong fetching the post.</div>
    if (!isSuccess) return <div>Got the data</div>


    const { user, created_at, content, user_id, id, updated_at, down_count, up_count, view_count } = posts;
    const profile_pic = user.profile?.profile_pic ?? null;




    console.log(posts);
    return (

        <div className="h-[95vh] px-10 dark:bg-black bg-white w-[100vw] ">
            <div className="mb-10  select-text relative dark:shadow-gray-600 border dark:border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2">




                <div className="user relative flex gap-5 items-center w-full ">
                    {
                        profile_pic ? <img onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer h-[40px] w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="lg" />
                    }
                    <div onClick={() => navigate('/profile/' + user_id)} className="cursor-pointer text-2xl name font-bold dark:text-slate-300 text-gray-700">{user.name}</div>
                    <div className="cursor-pointer name  dark:text-slate-300 text-gray-700">Posted in {formatDate(created_at)}</div>
                    <div className="cursor-pointer name  dark:text-slate-300 text-gray-700">Updated in {formatDate(updated_at)}</div>
                    <div className="div active:opacity-50 ml-auto p-4 rounded-full hover:opacity-80 cursor-pointer" onClick={() => setIsPopup(!isPopup)}>:</div>
                    {

                        isPopup && <div className="z-50 select-none options absolute w-[200px] px-2 py-5 rounded-lg right-0 top-[100%] bg-white shadow-lg border  dark:bg-gray-600">
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



                    }
                </div>


                <div className="description dark:text-slate-300 text-lg">



                    <MarkdownShower text={content} isPreview={true} />


                </div>



                <div className="select-none dark:text-slate-300 vote_views flex justify-between">

                    <div className="voting flex gap-6">
                        <div onClick={() => castVote({ vote_type: '1', post_id })} className="upvote cursor-pointer"><FontAwesomeIcon icon={faArrowUp} /> {up_count}</div>
                        <div onClick={() => castVote({ vote_type: '-1', post_id })} className="downvote cursor-pointer"><FontAwesomeIcon icon={faArrowDown} /> {down_count}</div>
                    </div>
                    {/* <div className="answers cursor-pointer" onClick={() => navigate("/post/" + post_id)}>Answers</div> */}

                    <div className="views"><FontAwesomeIcon icon={faEye} /> {view_count}</div>
                </div>


            </div>


            <div className="answer Count text-3xl font-bold my-5">There are {posts.answers.length} answers</div>


            <div className="answersList  flex flex-col items-end ml-auto">
                {
                    posts.answers.map(answer=>{
                        return <AnswerBox {...answer}key={answer.id} />
                    })
                }
            </div>



            <AddAnswer post_id={post_id}/>



                <div className="reco text-2xl font-bold mt-5">Similar Posts</div>

            <div className="mt-5">
      {
       recommended.map((post:any)=>{
          // console.log(key)
          return <Post {...post} key={post.id}/>
        })
      }
    </div>




        </div>
    )
}

export default ViewAnswers