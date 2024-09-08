import { lazy, useCallback, useEffect, useRef, useState } from 'react'

import { api, useCreatePostMutation, usePostAnswerMutation } from '../../api/apiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import ConfigStore from '../../zustand/ConfigStore';
import axios from 'axios';
import { editor as editorType } from 'monaco-editor';
import MarkdownShower from '../markdown/MarkdownShower';
import MarkdownEditor from '../markdown/MarkdownEditor';
import useAuthStore from '../../zustand/AuthStore';

function AddAnswer({post_id}:{post_id:number}) {

    // const {setRightNav,setLeftNav,setHeaderNav} = ConfigStore();
    const [text, setText] = useState(localStorage.getItem("answer")?? '');
    const dispatch = useDispatch();
    const token = useAuthStore().token;
    const isDark = ConfigStore().isDark;
    const fileRef = useRef<HTMLInputElement>(null);
    const image = useRef('');
    var editorRef = useRef<editorType.IStandaloneCodeEditor>(null);
    const [isPreview,setPreview] = useState(true);
    
    const [addAnswer, {isError,isLoading,isSuccess}] = usePostAnswerMutation();


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
        const storeInterval = setInterval(()=>{
            localStorage.setItem('answer',editorRef.current?.getModel()?.getValue() ?? '' );
            // alert("stored the data")
        },60*1000)

        return ()=>{
            clearInterval(storeInterval);
        };
    },[])

    const sendAnswer = useCallback(() => {
        addAnswer({ markdown: text,post_id: post_id });
    }, [text]);

    useEffect(()=>{
        if(isError) toast.error("Error occured posting the post");
        else if(isSuccess) {
            
            localStorage.setItem("answer",'');
            setText('');
            toast.success("Answer is posted successfully");
            // history.back();
        }
    },[isError,isSuccess]);

   async function uploadImage(e:React.ChangeEvent<HTMLInputElement>){
        const files = e.target.files;
        if(files){
            const form = new FormData();
            form.append('image',files[0]);

            try{

                const response = await axios.post('http://localhost:8000/api/v1/store_image', form, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization':'Bearer '+token,
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

    


    return (
        <div className=' h-full flex flex-col border relative rounded-lg p-2 dark:bg-gray-600'>
            {/* <span onClick={()=>setLeftNav()} className='absolute cursor-pointer  top-0 left-5'>:</span> */}
            {/* <span onClick={()=>setHeaderNav()} className='absolute cursor-pointer  top-0 left-16'>:</span> */}
            <input hidden ref= {fileRef} onChange={(e)=>uploadImage(e)} type="file" accept='image/*' />

            <div className="title flex justify-between  flex-wrap items-center text-center mb-0">
                <span className='text-2xl justify-self-center pl-4 self-center  font-bold'>Provide Answer</span>
                
                <div className="footer mt-5 text-center mb-5 flex items-center  flex-wrap justify-center gap-10">

                    <button onClick={()=> fileRef.current?.click()}   className='text-2xl text-white font-bold bg-sky-600 px-6 hover:bg-green-700 active:bg-green-800 py-1 rounded-lg'>Image</button>
                    <button onClick={insertCodeInEditor}   className='text-2xl text-white font-bold bg-amber-600 px-6 hover:bg-green-700 active:bg-green-800 py-1 rounded-lg'>Code</button>


                    <button onClick={()=>{setPreview(!isPreview)}} className='text-2xl text-white font-bold bg-pink-600 px-6 hover:bg-purple-700 active:bg-purple-800 py-1 rounded-lg'>Preview</button>
                    <button onClick={()=>{localStorage.setItem("answer",text);toast.success("Post is drafted successfully")}} className='text-2xl text-white font-bold bg-purple-600 px-6 hover:bg-purple-700 active:bg-purple-800 py-1 rounded-lg'>Draft</button>
                    <button onClick={()=>history.back()} className='text-2xl text-white font-bold bg-red-600 px-6 hover:bg-red-700 active:bg-red-800 py-1 rounded-lg'>Cancel</button>
                    <button onClick={sendAnswer} className='text-2xl text-white font-bold bg-green-600 px-6 hover:bg-green-700 active:bg-green-800 py-1 rounded-lg'>Submit</button>
                </div>
            </div>


            <div className="content overflow-y-auto relative h-full grow flex dark:border-gray-500 rounded-lg w-full">
                {
                    isLoading &&  <div className="spinner w-[100px] h-[100px] absolute top-1/2 left-1/2"></div>
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


export default AddAnswer