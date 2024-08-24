import { lazy, useCallback, useEffect, useState } from 'react'
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown'
import { api, useCreatePostMutation } from '../../api/apiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

// const ReactMarkdown = lazy(()=>import('react-markdown'));
// const SyntaxHighlighter = lazy(()=>import('react-syntax-highlighter'));

function AddPost() {

    const [text, setText] = useState("");
    const dispatch = useDispatch();
    
    const [createPost, { isLoading, isSuccess, isError }] = useCreatePostMutation();

    const sendPost = useCallback(() => {
        createPost({ content: text });
    }, [text]);

    useEffect(()=>{
        if(isError) toast.error("Error occured posting the post");
        else if(isSuccess) {

            // dispatch<any>(
            //     api.util.updateQueryData('getPost','1',(draft)=>{
                    
            //     })
            // );
            

            toast.success("Post is posted successfully");
            history.back();
        }
    },[isError,isSuccess]);


    // if (isLoading) return <div>Posting the post. Please wait a while...</div>
    if (isSuccess) return <div>Post is posted. Go back Now</div>
    return (
        <div className=' h-full flex flex-col border rounded-lg p-4 dark:bg-gray-600'>

            <div className="title text-center mb-5">
                <span className='text-2xl font-bold'>Add New Post</span>
            </div>


            <div className="content relative border grow flex dark:border-gray-500 rounded-lg w-full">
                {
                    isLoading?

                         <div className="spinner w-[100px] h-[100px] absolute top-1/2 left-1/2"></div>
                         :
                         null

                }

                <textarea autoFocus className='p-6 w-1/2 dark:bg-gray-600 outline-none rounded-lg ' value={text} onChange={(e) => setText(e.target.value)} />
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
                }} className="border-l dark:border-gray-500 p-6 w-1/2 dark:bg-gray-600  overflow-auto" />

            </div>


            <div className="footer mt-5 text-center mb-5 flex items-center justify-center gap-10">
                <button className='text-2xl font-bold bg-red-600 px-6 hover:bg-red-700 active:bg-red-800 py-1 rounded-lg'>Cancel</button>
                <button onClick={sendPost} className='text-2xl font-bold bg-green-600 px-6 hover:bg-green-700 active:bg-green-800 py-1 rounded-lg'>Post</button>
            </div>


        </div>
    )
}

// const SyntaxHighlight = ({value,langugage}:any)=>{
//     return <SyntaxHighlighter langugage={langugage} style={docco} > {value} </SyntaxHighlighter>
// }


export default AddPost