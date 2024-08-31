import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { memo } from "react"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter"
import { ghcolors as white } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dracula as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ConfigStore from "../../zustand/ConfigStore"

function MessageBox({ id, markdown, pic, conversation_id, user_id, current_user, text, lastMessageRef }: any) {

    // console.log("Message box")
    const navigate = useNavigate();
    const isDark = ConfigStore().isDark;


    return <div ref={lastMessageRef}>


        {user_id == current_user ?
            <div className="rec   flex justify-start  gap-3 m-4">

                {
                    markdown ?


                        <>
                            {pic ? <img onClick={() => navigate('/profile/' + user_id)} className="h-[50px] cursor-pointer w-[50px] rounded-full" src={"http://localhost:8000/storage/profiles/" + pic} />

                                :
                                <FontAwesomeIcon className="" icon={faPerson} size="2xl" />}
                            <div className="div p-2 bg-gray-200 dark:bg-gray-700 w-[80%] rounded-lg">


                                <ReactMarkdown children={markdown} components={{
                                    code(props) {
                                        const { children, className, node, ...rest } = props;

                                        const match = /language-(\w+)/.exec(className || '');
                                        var isLine: boolean | undefined = false;
                                        var lineNumber = 1;
                                        var lineErrors: string[] | undefined = [];
                                        if (match) {
                                            let meta = node?.data?.meta;
                                            isLine = meta?.includes("line");
                                            var isError = meta?.includes("errors");

                                            if (isLine) {
                                                if (isError) {
                                                    let index = meta?.indexOf('errors');
                                                    let lineErrorsText = index ? meta?.substring(index + 7) : null;
                                                    lineErrors = lineErrorsText?.split(',')
                                                    console.log(lineErrors)

                                                }//if error

                                                const match = meta?.match(/\d+/);
                                                if (match) {
                                                    lineNumber = parseInt(match[0], 10);
                                                }
                                            }//if line

                                        }
                                        return match ?

                                            <div className='relative'>

                                                {/* <button className='absolute  right-8 top-8'>||</button> */}

                                                <SyntaxHighlighter
                                                    {...rest}
                                                    PreTag="div"
                                                    children={String(children).replace(/\n$/, '')}
                                                    language={match[1]}
                                                    customStyle={{ fontSize: '20px' }}
                                                    showLineNumbers={isLine}
                                                    style={isDark ? dark : white}
                                                    lineNumberStyle={(line: number) => { if (lineErrors?.indexOf(line + "") != -1) return { backgroundColor: 'black', color: 'white' } }}
                                                    startingLineNumber={lineNumber}
                                                    className="!rounded-lg !p-4"

                                                /> </div>
                                            : <code {...rest} className={className}>{children}</code>

                                    }
                                }} className=" overflow-auto w-[80%]" />
                            </div>
                        </>

                        :


                        <>
                            {pic ? <img onClick={() => navigate('/profile/' + user_id)} className="h-[50px] cursor-pointer w-[50px] rounded-full" src={"http://localhost:8000/storage/profiles/" + pic} />

                                :
                                <FontAwesomeIcon className="" icon={faPerson} size="2xl" />}

                            <div className="msg w-1/2 bg-gray-600 text-white p-4 rounded-lg">{text}</div>
                        </>

                }


            </div>
            : <div className="sent  flex justify-end m-4">
                {

                    markdown ?


                        <div className="div p-2 bg-gray-200 dark:bg-gray-700 w-[80%] rounded-lg">

                            <ReactMarkdown children={markdown} components={{
                                code(props) {
                                    const { children, className, node, ...rest } = props;

                                    const match = /language-(\w+)/.exec(className || '');
                                    var isLine: boolean | undefined = false;
                                    var lineNumber = 1;
                                    var lineErrors: string[] | undefined = [];
                                    if (match) {
                                        let meta = node?.data?.meta;
                                        isLine = meta?.includes("line");
                                        var isError = meta?.includes("errors");

                                        if (isLine) {
                                            if (isError) {
                                                let index = meta?.indexOf('errors');
                                                let lineErrorsText = index ? meta?.substring(index + 7) : null;
                                                lineErrors = lineErrorsText?.split(',')
                                                console.log(lineErrors)

                                            }//if error

                                            const match = meta?.match(/\d+/);
                                            if (match) {
                                                lineNumber = parseInt(match[0], 10);
                                            }
                                        }//if line

                                    }
                                    return match ?

                                        <div className='relative'>

                                            {/* <button className='absolute  right-8 top-8'>||</button> */}

                                            <SyntaxHighlighter
                                                {...rest}
                                                PreTag="div"
                                                children={String(children).replace(/\n$/, '')}
                                                language={match[1]}
                                                customStyle={{ fontSize: '20px' }}
                                                showLineNumbers={isLine}
                                                style={isDark ? dark : white}
                                                lineNumberStyle={(line: number) => { if (lineErrors?.indexOf(line + "") != -1) return { backgroundColor: 'black', color: 'white' } }}
                                                startingLineNumber={lineNumber}
                                                className="!rounded-lg !p-4"

                                            /> </div>
                                        : <code {...rest} className={className}>{children}</code>

                                }
                            }} className=" overflow-auto w-[80%]" />
                        </div>

                        : <div className={"msg w-1/2 bg-blue-600 text-white p-4 rounded-lg " + (conversation_id > 0 ? "bg-blue-500" : (conversation_id == -1 ? "bg-green-500" : "bg-red-600"))}>{text}</div>


                }
                {/* //markdown */}



            </div>}
    </div>
}//MessageBox

export default memo(MessageBox)