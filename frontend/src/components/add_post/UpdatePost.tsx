import { lazy, useCallback, useEffect, useState } from 'react'
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown'
import { api, useCreatePostMutation, useGetPostQuery, useUpdatePostMutation } from '../../api/apiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import  {Editor} from '@monaco-editor/react';
import { useLocation, useParams } from 'react-router-dom';

// const ReactMarkdown = lazy(()=>import('react-markdown'));
// const SyntaxHighlighter = lazy(()=>import('react-syntax-highlighter'));

function UpdatePost() {

    // const location = useLocation();
    const  post_id = useParams().post_id || null;
    // const post = location.state || "";
    const {isLoading,isError,isSuccess,data:post={}}= useGetPostQuery({post_id});
    // const data = location.state || {};

    // alert(post_id)

    const [text, setText] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        if(isSuccess) setText(post.content);
    },[isSuccess])
    
    const [updatePost, { isLoading:isPostUpdating, isSuccess:isPostUpdated, isError:isPostError }] = useUpdatePostMutation();

    // const sendPost = useCallback(() => {
    //     createPost({ content: text });
    // }, [text]);

    useEffect(()=>{
        if(isPostError) toast.error("Error occured posting the post");
        else if(isPostUpdated) {

            // dispatch<any>(
            //     api.util.updateQueryData('getPost','1',(draft)=>{
                    
            //     })
            // );
            

            toast.success("Post is posted successfully");
            history.back();
        }
    },[isPostError,isPostUpdated]);


    // if (isLoading) return <div>Posting the post. Please wait a while...</div>
    if (isLoading) return <div>Please wait.Loading the post data...</div>
    return (
        <div className=' h-full flex flex-col border rounded-lg p-4 dark:bg-gray-600'>

            <div className="title text-center mb-5">
                <span className='text-2xl font-bold'>Update Post</span>
            </div>


            <div className="content relative border grow overflow-y-auto flex dark:border-gray-500 rounded-lg w-full">
                {
                    isPostUpdating?

                         <div className="spinner w-[100px] h-[100px] absolute top-1/2 left-1/2"></div>
                         :
                         null

                }

                
                <Editor height={'100%'}
                options={{
                    minimap:{enabled:false},
                    fontFamily: 'Fira Code Retina, monospace', // Set your desired font family
                    fontSize: 18, // Set font size (in pixels)
                    lineHeight: 22, // Set line height (in pixels)
                    fontLigatures: true, // Enable font ligatures (if supported by the font)
                  }}
                defaultValue={text} language='markdown' className='grow overflow-y-auto !text-2xl p-6 w-1/2 dark:bg-gray-600 outline-none rounded-lg' value={text} onChange={(e:any)=>setText(e)} />
                {/* <textarea autoFocus className='p-6 w-1/2 dark:bg-gray-600 outline-none rounded-lg ' value={text} onChange={(e) => setText(e.target.value)} /> */}
                <ReactMarkdown children={text} components={{
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
                }} className="border-l grow overflow-y-auto dark:border-gray-500 p-6 w-1/2 dark:bg-gray-600  overflow-auto" />

            </div>


            <div className="footer mt-5 text-center mb-5 flex items-center justify-center gap-10">
                <button className='text-2xl font-bold bg-red-600 px-6 hover:bg-red-700 active:bg-red-800 py-1 rounded-lg'>Cancel</button>
                <button onClick={()=>updatePost({post_id,content:text})}  className='text-2xl font-bold bg-green-600 px-6 hover:bg-green-700 active:bg-green-800 py-1 rounded-lg'>Update</button>
            </div>


        </div>
    )
}

// const SyntaxHighlight = ({value,langugage}:any)=>{
//     return <SyntaxHighlighter langugage={langugage} style={docco} > {value} </SyntaxHighlighter>
// }


export default UpdatePost;