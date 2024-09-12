import {
  faClose,
  faCode,
  faLeftLong,
  faPerson,
  faShare,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import MessageBox from "./MessageBox";
import {
  api,
  useGetMessagesQuery,
  useGetPreviousMessagesMutation,
  useSendMessageMutation,
  useUpdateMessageViewMutation,
} from "../../api/apiSlice";
// import { echo } from "../../echo/echoConfig";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Echo, { Channel } from "laravel-echo";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import CodeMessageEditor from "./CodeMessageEditor";
import CodeMessageEditing from "./CodeMessageEditing";
import ConfigStore from "../../zustand/ConfigStore";
import useAuthStore from "../../zustand/AuthStore";

function ListMessages() {
  // const { user_id } = useParams();
  const { id:user_id } = useParams();
  const {user} = useAuthStore();
  const location = useLocation().state;
  const lastMessageRef = useRef<any>();

  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const {setRightNav,setLeftNav,setHeaderNav} = ConfigStore();

  // const { loading, messages, user, getMessages, sendMessage } = useMessage();
  const {
    data: messages = { user: {}, messages: [], isNoMoreMsg: false },
    isSuccess,
    isLoading: isMessageLoaded
  } = useGetMessagesQuery(Number(user_id));
  const [sendMessage, { isLoading: isMessageSending }] =
    useSendMessageMutation();

  const [
    getPreviousMessage,
    { isLoading, isSuccess: isPreviousLoaded, data: previousMessage = [] },
  ] = useGetPreviousMessagesMutation();

  const dispatch = useDispatch();
  const circular = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  var previousScrollHeight = useRef<number>(-1);
  const [isCodeEditing,setCodeEditing] = useState(false);
  const [markdown,setMarkdown] = useState(null);
  // var [disableScrollListener,setDisableScroll] = useState(false)

  var echoChannelRef = useRef<Channel>(null);

  const [updateMessageView] = useUpdateMessageViewMutation();


  useEffect(()=>{
    updateMessageView(Number(user_id));
  },[])


  useEffect(() => {
    if (messages.isNoMoreMsg) {
      // setDisableScroll(true);
      if (loader.current)
        loader.current.innerText = "There are no more messages";
    } //
    if (isMessageSending) {
      if (container.current)
        container.current.scrollTop =
          container.current.scrollHeight - container.current.clientHeight;
      previousScrollHeight.current = -1;
      return;
    }
    // console.log("Loaded previous with messages***: ",messages)
    if (previousScrollHeight.current >= 0) {
      if (container.current)
        container.current.scrollTop =
          container.current.scrollHeight - previousScrollHeight.current;
    } else {
      if (container.current)
        container.current.scrollTop =
          container.current.scrollHeight - container.current.clientHeight;
    }
  }, [messages, isMessageSending]);

  useEffect(() => {
    if (messages.isNoMoreMsg) return;
    if (messages.messages.length == 0) return;
    // if(!isSuccess) return;
    const scrollCallback = (event: Event) => {
      if (isLoading) return;
      // if(container.current)
      var scrollHeight = container.current?.scrollHeight;
      var scrollTop = container.current?.scrollTop;
      if (scrollTop == 0) {
        previousScrollHeight.current = scrollHeight || -1;
        // console.log("Fetching messages to append above... of id ",messages.messages[0])
        getPreviousMessage({
          user_id: Number(user_id),
          last_message_id: messages.messages[0].id,
        });
      }
    };

    if (container.current == null) return;
    container.current.addEventListener("scroll", scrollCallback);

    return () =>
      container.current?.removeEventListener("scroll", scrollCallback);
  }, [isLoading, messages]);


  // useEffect(()=>{
  //   if(!msg) return;
  //   var channel = echoChannelRef.current;
  //   console.log(channel);
  //   if(channel){
  //     alert("yes we havechannel");
  //   }
  // },[msg])



  const submitFormTextArea = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key != "Enter") return;

      var value = (e.target as HTMLTextAreaElement).value;

      // if(value.length>0)
      submitMessageForm(e);
    },
    [msg],
  );

  const submitMessageForm = useCallback(
    (e: any) => {
    // alert(markdown)
      e.preventDefault();

      sendMessage({ user_id: Number(user_id),is_markdown:false, text: msg });
      setMsg("");
    },
    [msg],
  );

  useEffect(()=>{
    

    if(!markdown)return;
    sendMessage({ user_id: Number(user_id),is_markdown:true,text:markdown });

  },[markdown]);

  const renderMessages = useMemo(() => {
    // console.log("Calling from render message",messages)
    if (!messages || !messages.messages) return;
    const pic = messages.user.profile?.profile_pic;
    // console.log(messages)
    return messages?.messages.map((msg: any, key: number) => {
      // console.log(key)
      return (
        <MessageBox
          key={key}
          {...msg}
          pic = {pic}
          current_user={user_id}
          lastMessageRef={lastMessageRef}
        />
      );
    }); //map
  }, [messages]);

  return (
    <div className="  flex h-full flex-col  rounded-lg shadow-md p-4 pb-0">
     
     {
        isCodeEditing &&
        <div className="absolute h-[100%] z-50 w-[90%] top-0 left-[5%] bg-white">
          <CodeMessageEditing setCodeEditingVisiblity = {setCodeEditing} setMarkdown= {setMarkdown}/>
        </div> 
     }
     
      <div className="header flex justify-between  items-center align-middle">
        <div className=" justify-center  gap-5 flex items-center ">
          {/* <FontAwesomeIcon
            onClick={() =>  history.back() }
            className="hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-200 rounded-lg p-3"
            icon={faLeftLong}
          /> */}
          {

            messages.user.profile?.profile_pic ? <img onClick={()=>navigate('/profile/'+messages.user?.id)} className="h-[40px] object-cover cursor-pointer w-[40px] rounded-full" src={"http://localhost:8000/storage/profiles/" + messages.user.profile.profile_pic} /> : <FontAwesomeIcon icon={faPerson} size="2xl" />}

          <span onClick={()=>navigate('/profile/'+messages.user?.id)} className="text-xl cursor-pointer dark:text-gray-200 font-bold text-gray-600">
            {messages?.user != null ? messages.user.name : location?.name}
          </span>
          {/* <span className="text-gray-600 ">{props.active}</span> */}
        </div>


        {/* <FontAwesomeIcon
          icon={faClose}
          onClick={() => navigate("/")}
          size="2xl"
          className=""
        /> */}
      </div>

      <div
        ref={container}
        className="messages grow overflow-y-auto break-words"
      >
        <div ref={loader} className="flex justify-center">
          <div ref={circular} className="loader"></div>
        </div>

        {
          isMessageLoaded ? <div className=" flex h-full justify-center items-center">
            <div className="spinner h-32 w-32 shadow-lg rounded-full"></div>
          </div> : renderMessages
        }

      </div>
      <form className="footer flex items-center gap-3">
        <FontAwesomeIcon onClick={()=>setCodeEditing(!isCodeEditing)} icon={faToolbox} size="2xl" className="text-gray-400 hover:text-gray-500 active:text-gray-600" />
        <textarea
          rows={1}
          onKeyDown={submitFormTextArea}
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="resize-y h-fit text-wrap dark:bg-gray-700 bg-gray-200 w-full p-4 rounded-lg dark:focus:outline-gray-800 focus:outline-gray-300 my-4"
          placeholder="Enter to type messages"
        />
        <input
          type="submit"
          value={"Send"}
          disabled={msg ? false : true}
          onClick={submitMessageForm}
          className="disabled:bg-blue-300 border p-3 rounded-lg dark:disabled:bg-gray-500 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white"
        />
      </form>
    </div>
  );
}

export default ListMessages;
