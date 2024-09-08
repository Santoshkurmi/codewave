import ConfigStore from "../../zustand/ConfigStore";
import { ghcolors as white } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dracula as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import  SyntaxHighlighter  from "react-syntax-highlighter/dist/esm/prism-light";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { lazy, useRef, useState } from "react";
import axios from "axios";
import useAuthStore from "../../zustand/AuthStore";


// const SyntaxHighlighter = lazy(()=>import('react-syntax-highlighter/dist/esm/prism-light'));

SyntaxHighlighter.registerLanguage('jsx', jsx);

function MarkdownSyntaxHighlighter({ rest, children, match, isLine, lineErrors, lineNumber }: any) {
  const isDark = ConfigStore().isDark;
  const language = match[1];
  const token = useAuthStore().token;
  const [output, setOutput] = useState<string|null>(null);

  console.log(language);
  

  async function runCodeFromServer(){
    // alert(language)
    const response = await axios.post('http://localhost:8000/api/v1/run_code', {language:language,code:children}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token,
      },
    });

    setOutput(response.data.output);
  }

  return (

    <div className="code_markdown rounded-lg  p-2 relative">
      <FontAwesomeIcon onClick={() => navigator.clipboard.writeText(children)} className="copy hover:opacity-70 active:opacity-50 cursor-pointer p-1 absolute top-8 right-8 hidden" icon={faClipboard} />
      <FontAwesomeIcon onClick={runCodeFromServer} className="copy hidden hover:opacity-70 active:opacity-50 cursor-pointer p-1 absolute top-8 right-20 " icon={faPlay} />

      {/* <span className="copy absolute top-0 right-4 hidden">Copy</span> */}
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        language={language}
        showLineNumbers={isLine}
        customStyle={{ fontSize: '20px' }}
        style={isDark ? dark : white}
        lineNumberStyle={(line: number) => { if (lineErrors?.indexOf(line + "") != -1) return { backgroundColor: 'red', borderRadius: '5px' } }}
        startingLineNumber={lineNumber}
        className="!rounded-lg !pt-10  !pr-10"

      />

      {
       output&& 
        <div className="copy rounded-lg shadow-lg overflow-x-auto dark:bg-gray-800 p-2 output hidden">
          <div className="w-full ">Output:</div>
          <code className="msg">{output}</code>
        </div>
      }



    </div>



  )
}

export default MarkdownSyntaxHighlighter