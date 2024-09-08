import { faPerson } from "@fortawesome/free-solid-svg-icons"
import Post from "../post/Post"
import { Outlet } from "react-router-dom"
import { useGetPostQuery } from "../../api/apiSlice"

function Feeds() {
    
  const {isError,isSuccess,isLoading,data:posts} = useGetPostQuery('1');

  if(isLoading) return <div className="h-full w-full flex justify-center items-center">
    <div className="spinner h-[100px] w-[100px]"></div>
  </div>  
  if(isError) return <div>Something went wrong fetching the post</div>
  return (
    <div className="">
      {
      posts &&  posts.map((post:any)=>{
          // console.log(key)
          return <Post {...post} key={post.id}/>
        })
      }
    </div>
  )
}

export default Feeds
