
function RightNav() {
    const links = [
        { text:"ReactHooks"},
        { text:"Hello world in php"},
        { text:"Routing problem in react"},
        { text:"Handle multiple threads"},
        { text:"Error in rendering"},
        { text:"Fix this code"},
       
];
    return (
        <div className="select-none max-h-[80vh] overflow-y-auto dark:border-gray-400  shadow-lg border rounded-lg p-4">
            <span className="text-3xl font-bold dark:text-gray-300">Trendings Topic</span>
            {
                links.map((data,key) => {
                    return (
                        <div key={key}
                         className={"cursor-pointer dark:text-gray-200 active:bg-gray-300 hover:bg-gray-200 p-4 transition-all duration-500 ease-in-out gap-5 flex items-center text-blue-500 "} >
                            <span className="">#{data.text}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RightNav