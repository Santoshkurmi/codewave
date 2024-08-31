
import  {Editor} from '@monaco-editor/react';

function MarkdownEditor({text,isDark,editorRef,setText,isPreview}:any) {
  return (
    <Editor height={'100%'}
    options={{
        theme: isDark? 'vs-dark':'white',
        minimap:{enabled:false},
        fontFamily: 'Fira Code Retina, monospace', // Set your desired font family
        fontSize: 20, // Set font size (in pixels)
        lineHeight: 22, // Set line height (in pixels)
        fontLigatures: true, // Enable font ligatures (if supported by the font)
        // roundedSelection:true,
        
        
      }}
    onMount={(editor)=>editorRef.current  = editor}
    defaultValue={text} 
    width={isPreview? '60%':'100%'}
    language='markdown' 
    className='!text-2xl overflow-hidden dark:bg-gray-600 outline-none rounded-lg' 
    value={text} onChange={(e:any)=>setText(e)} />
  )
}

export default MarkdownEditor