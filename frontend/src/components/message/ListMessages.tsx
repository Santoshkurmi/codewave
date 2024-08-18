import {
  faClose,
  faLeftLong,
  faPerson,
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
} from "../../api/apiSlice";
// import { echo } from "../../echo/echoConfig";
import { getUser } from "../../axios/tokens";
import { useDispatch } from "react-redux";
import { echo } from "../../echo/echoConfig";

function ListMessages(props: any) {
  const { user_id } = useParams();
  const location = useLocation().state;
  const lastMessageRef = useRef<any>();

  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  // const { loading, messages, user, getMessages, sendMessage } = useMessage();
  const {
    data: messages = { user: {}, messages: [], isNoMoreMsg: false },
    isSuccess,
  } = useGetMessagesQuery(Number(user_id));
  const [sendMessage, { isLoading: isMessageSending }] =
    useSendMessageMutation();

  const [
    getPreviousMessage,
    { isLoading, isSuccess: isPreviousLoaded, data: previousMessage = [] },
  ] = useGetPreviousMessagesMutation();

  const dispatch = useDispatch();
  const circular = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>();
  const loader = useRef<HTMLDivElement>(null);
  var previousScrollHeight = useRef<number>(-1);
  // var [disableScrollListener,setDisableScroll] = useState(false)

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

  useEffect(() => {
    // alert("y")
    // return;
    var channel = echo.private("message.sent." + getUser());

    channel.listen("MessageSentEvent", (event: any) => {
      // alert(event.message)
      // console.log("Message Received", event.message.text);
      dispatch<any>(
        api.util.updateQueryData("getMessages", Number(user_id), (draft) => {
          // var scrollHeight = container.current?.scrollHeight
          // previousScrollHeight.current = 500 || -1;
          draft.messages.push(event.message);
        }),
      ); //dispatch
    }); //echo privat chat

    return () => {
      channel.stopListening("MessageSentEvent");
    };
  }, []);

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
      e.preventDefault();

      sendMessage({ user_id: Number(user_id), text: msg });
      setMsg("");
    },
    [msg],
  );

  const renderMessages = useMemo(() => {
    // console.log("Calling from render message",messages)
    if (!messages || !messages.messages) return;
    // console.log(messages)
    return messages?.messages.map((msg: any, key: number) => {
      // console.log(key)
      return (
        <MessageBox
          key={key}
          {...msg}
          current_user={user_id}
          lastMessageRef={lastMessageRef}
        />
      );
    }); //map
  }, [messages]);

  return (
    <div className="fixed bg-white border top-[6rem] left-[25rem] w-[50vw] rounded-lg shadow-md px-8 py-5">
      <div className="center flex justify-between  items-center align-middle">
        <div className="header justify-center mb-6 gap-5 flex items-center ">
          <FontAwesomeIcon
            onClick={() => navigate("/popMessages")}
            className="hover:bg-gray-300 active:bg-gray-200 rounded-lg p-3"
            icon={faLeftLong}
          />
          <FontAwesomeIcon icon={faPerson} size="2xl" />
          <span className="text-xl font-bold text-gray-600">
            {messages?.user != null ? messages.user.name : location?.name}
          </span>
          {/* <span className="text-gray-600 ">{props.active}</span> */}
        </div>
        <FontAwesomeIcon
          icon={faClose}
          onClick={() => navigate("/")}
          size="2xl"
          className=""
        />
      </div>

      <div
        ref={container}
        className="messages h-[60vh] overflow-y-auto break-words"
      >
        <div ref={loader} className="flex justify-center">
          <div ref={circular} className="loader"></div>
        </div>

        {renderMessages}
      </div>
      <form className="type_msg flex items-center gap-3">
        <textarea
          rows={2}
          onKeyDown={submitFormTextArea}
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="resize-y h-fit text-wrap bg-gray-200 w-full p-4 rounded-lg focus:outline-gray-300 my-4"
          placeholder="Enter to type messages"
        />
        <input
          type="submit"
          value={"Send"}
          disabled={msg ? false : true}
          onClick={submitMessageForm}
          className="disabled:bg-blue-300 border p-3 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white"
        />
      </form>
    </div>
  );
}

export default ListMessages;
