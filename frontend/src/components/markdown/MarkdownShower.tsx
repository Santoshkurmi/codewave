import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import MarkdownSyntaxHighlighter from "./MarkdownSyntaxHighligher";



function MarkdownShower({ text, isPreview }: any) {
    return (

        <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} components={{
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

                    <MarkdownSyntaxHighlighter rest={rest} children={children} match={match} isLine={isLine} lineErrors={lineErrors} lineNumber={lineNumber} />
                    : <code {...rest} className={className}>{children}</code>

            }
        }}
            className={"border-l text-2xl dark:border-gray-500 p-6 w-full dark:bg-gray-600   overflow-y-auto " + (isPreview ? "block" : 'hidden')} />
    )
}

export default MarkdownShower