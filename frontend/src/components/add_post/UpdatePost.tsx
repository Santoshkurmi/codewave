import { lazy, useCallback, useEffect, useRef, useState } from 'react'
import {PrismAsyncLight as SyntaxHighlighter} from "react-syntax-highlighter"
import { ghcolors as white } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dracula as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown'
import { api, useCreatePostMutation, useGetPostQuery, useUpdatePostMutation } from '../../api/apiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import  {Editor} from '@monaco-editor/react';
import { useLocation, useParams } from 'react-router-dom';
import ConfigStore from '../../zustand/ConfigStore';
import { editor as editorType } from 'monaco-editor';
import axios from 'axios';
import { getToken } from '../../axios/tokens';
import MarkdownShower from '../markdown/MarkdownShower';
import MarkdownEditor from '../markdown/MarkdownEditor';

// const ReactMarkdown = lazy(()=>import('react-markdown'));
// const SyntaxHighlighter = lazy(()=>import('react-syntax-highlighter'));

function UpdatePost() {

    // const location = useLocation();
    const isDark = ConfigStore().isDark;
    const  post_id = useParams().post_id || null;

    const {setRightNav,setLeftNav,setHeaderNav} = ConfigStore();
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const fileRef = useRef<HTMLInputElement>(null);
    const image = useRef('');
    var editorRef = useRef<editorType.IStandaloneCodeEditor>(null);
    const [isPreview,setPreview] = useState(true);
    // const post = location.state || "";
    const {isLoading,isError,isSuccess,data:post={}}= useGetPostQuery({post_id});
    const [updatePost, { isLoading:isPostUpdating, isSuccess:isPostUpdated, isError:isPostError }] = useUpdatePostMutation();

    // const data = location.state || {};

    function insertImageInEditor(imageUrl:string){
        const editor = editorRef.current;
        if(!editor) return;

        const position = editor.getPosition() ;
        const model = editor.getModel();

        editor.executeEdits('insert-text',[
            {
                range: {
                    startLineNumber:position?.lineNumber as number + 1,
                    endLineNumber:position?.lineNumber as number,
                    startColumn:position?.column as number + 1,
                    endColumn:position?.column as number + 1,
                    // startColumn:0,
                    // endColumn:0,
                } ,
                text:imageUrl
            }
        ]);


        editor.setPosition({
            lineNumber:position?.lineNumber as number + 2,
            column: 1
        })

        editor.focus();

        setText(model?.getValue()??'' );

    }//insert image

    function insertCodeInEditor(){
        const editor = editorRef.current;
        if(!editor) return;

        const position = editor.getPosition() ;
        const model = editor.getModel();

        editor.executeEdits('insert-text',[
            {
                range: {
                    startLineNumber:position?.lineNumber as number + 1,
                    endLineNumber:position?.lineNumber as number + 4,
                    startColumn:0,
                    endColumn:0,
                    // startColumn:0,
                    // endColumn:0,
                } ,
                text:"\n```js line 1\nconsole.log('Hello World')\n\n```"
            }
        ]);


        editor.setPosition({
            lineNumber:position?.lineNumber as number + 2,
            column: 27
        })

        editor.focus();

        setText(model?.getValue()??'' );

    }//insert

    useEffect(()=>{
        setRightNav(true);
        setLeftNav(true);
        setHeaderNav(true);
        // localStorage.setItem('post',text);

        const storeInterval = setInterval(()=>{
            localStorage.setItem('post',editorRef.current?.getModel()?.getValue() ?? '' );
            // alert("stored the data")
        },60*1000)

        
        
        return ()=>{
            clearInterval(storeInterval);
            setRightNav(false)
            setLeftNav(false)
            setHeaderNav(false)
        };
    },[])
    

   async function uploadImage(e:React.ChangeEvent<HTMLInputElement>){
    const files = e.target.files;
    if(files){
        const form = new FormData();
        form.append('image',files[0]);

        try{

            const response = await axios.post('http://localhost:8000/api/v1/store_image', form, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization':'Bearer '+getToken(),
                },
              });

           const data = response.data;
            image.current = data.data.image;
            const total_path = "\n![Image]("+"http://localhost:8000/storage/post_photos/"+ image.current+")\n";
            insertImageInEditor(total_path);
           console.log(data);
        }
        catch(err){
            alert(err);
        }
      

    }//
}//


    useEffect(()=>{
        if(isSuccess) setText(post.content);
    },[isSuccess])
    

    
    useEffect(()=>{
        if(isPostError) toast.error("Error occured posting the post");
        else if(isPostUpdated) {

            toast.success("Post is posted successfully");
            history.back();
        }
    },[isPostError,isPostUpdated]);

    // <button onClick={()=>updatePost({post_id,content:text})}  className='text-2xl font-bold bg-green-600 px-6 hover:bg-green-700 active:bg-green-800 py-1 rounded-lg'>Update</button>

    // if (isLoading) return <div>Posting the post. Please wait a while...</div>
    if (isLoading) return <div>Please wait.Loading the post data...</div>
    return (
        <div className=' h-full flex flex-col border relative rounded-lg p-2 dark:bg-gray-600'>
        <span onClick={()=>setLeftNav()} className='absolute cursor-pointer  top-0 left-5'>:</span>
        <span onClick={()=>setHeaderNav()} className='absolute cursor-pointer  top-0 left-16'>:</span>
        <input hidden ref= {fileRef} onChange={(e)=>uploadImage(e)} type="file" accept='image/*' />

        <div className="title flex justify-between  flex-wrap items-center text-center mb-0">
            <span className='text-2xl justify-self-center pl-4 self-center  font-bold'>Update Post</span>
            {/* <button onClick={()=> }   className='text-2xl text-white font-bold bg-sky-600 px-6 hover:bg-green-700 active:bg-green-800 py-1 rounded-lg'>Test</button> */}
            
            
            <div className="footer mt-5 text-center mb-5 flex items-center  flex-wrap justify-center gap-10">

                <button onClick={()=> fileRef.current?.click()}   className='text-2xl text-white font-bold bg-sky-600 px-6 hover:bg-green-700 active:bg-green-800 py-1 rounded-lg'>Image</button>
                <button onClick={insertCodeInEditor}   className='text-2xl text-white font-bold bg-amber-600 px-6 hover:bg-green-700 active:bg-green-800 py-1 rounded-lg'>Code</button>


                <button onClick={()=>{setPreview(!isPreview)}} className='text-2xl text-white font-bold bg-pink-600 px-6 hover:bg-purple-700 active:bg-purple-800 py-1 rounded-lg'>Preview</button>
                <button onClick={()=>{localStorage.setItem("post",text);toast.success("Post is drafted successfully")}} className='text-2xl text-white font-bold bg-purple-600 px-6 hover:bg-purple-700 active:bg-purple-800 py-1 rounded-lg'>Draft</button>
                <button onClick={()=>history.back()} className='text-2xl text-white font-bold bg-red-600 px-6 hover:bg-red-700 active:bg-red-800 py-1 rounded-lg'>Cancel</button>
                <button onClick={()=>updatePost({post_id,content:text})} className='text-2xl text-white font-bold bg-green-600 px-6 hover:bg-green-700 active:bg-green-800 py-1 rounded-lg'>Post</button>
            </div>
        </div>


        <div className="content overflow-y-auto relative h-full grow flex dark:border-gray-500 rounded-lg w-full">
            {
                isLoading?

                     <div className="spinner w-[100px] h-[100px] absolute top-1/2 left-1/2"></div>
                     :
                     null

            }

            
           
            <MarkdownEditor text={text} isDark={isDark} editorRef={editorRef} setText={setText} isPreview={isPreview} />

            <div className="markdown w-1/2">
                  <MarkdownShower text={text} isPreview = {isPreview} />
            </div>
   

        </div>


      


    </div>
    )
}

// const SyntaxHighlight = ({value,langugage}:any)=>{
//     return <SyntaxHighlighter langugage={langugage} style={docco} > {value} </SyntaxHighlighter>
// }


export default UpdatePost;