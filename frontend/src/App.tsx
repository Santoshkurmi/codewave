import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Home from "./components/home/Home.tsx";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Messages from "./components/message/Conversations.tsx";
import ListMessages from "./components/message/ListMessages";
import Test from "./tests/Test";
import Profile from "./components/profile/profile";
import Feeds from "./components/feed/Feeds";
import AddPost from "./components/add_post/AddPost";
import { store } from './api/store.ts'
import { Provider, useDispatch } from "react-redux";
import UpdatePost from "./components/add_post/UpdatePost.tsx";
import ViewAnswers from "./components/post/ViewAnswers.tsx";
import useAuthStore from "./zustand/AuthStore.ts";
import NewMessageUi from "./components/message/NewMessageUi.tsx";
import { useEffect } from "react";
import Echo from "laravel-echo";
import { api } from "./api/apiSlice.ts";
import EchoConfig from "./echo/echoConfig.tsx";



/**
 * This is the main App component. It handles the routing for the entire
 * application. It renders different components depending on the current
 * route. If the user is logged in, it renders the Home component. If the
 * user is not logged in, it renders the Login component. If the route is
 * not recognized, it renders a 404 error page.
 * @returns {JSX.Element} The App component
 */
function App() {
  const {token,user} = useAuthStore();

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Home /> : <Navigate to="/login" />,
      errorElement: (
        <div className="flex flex-col h-[100vh] justify-center items-center">
          <h1 className="text-2xl text-gray-500 font-bold">Error occured</h1>
          <h1 className="text-2xl text-gray-500 font-bold">Page Not Found</h1>
        </div>
      ),
      children: [
        {
          path: "/",
          element: <Feeds />,

        },
        {
          path: "/add_post",
          element: <AddPost />,

        },
        {
          path: "/update_post/:post_id",
          element: <UpdatePost/>,

        },
        {
          path: "/post/:post_id",
          element: <ViewAnswers/>,

        },
        
        {
          path: "messages",
          element: <NewMessageUi />,
          children:[
            {
              path:':id',
              element:<ListMessages/>
            }
          ]
        },

        {
          path: "messages.bak",
          element: <Messages />,
        },
        // {
        //   path: "messages/:user_id",
        //   element: <ListMessages />,
        // },
        {
          path: "profile/:user_id?",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: token ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: token ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/test",
      element: <Test />,
    },
  ]);
  console.log("Bye");


  const dispatch = useDispatch();
  
  useEffect(() => {
    // alert("y")
    // return;
    const echo: Echo = (window as any).echo;
    if (!echo) {
      toast.error("No echo found");
      return;
    }
    // alert(user?.id);
    var channel = echo.private("message.sent." + user?.id);
    // channel.whisper("typing", { user_id: 2 });
    // channel.listenForWhisper("typing", (e: any) => {
    //   alert(e.user_id + " is typing");
    // });
    // alert(user?.id);

    channel.listen("MessageSentEvent", (event: any) => {
      // alert("Message notcoming");
      // console.log("Message Received", event.message.text);

      dispatch<any>(
        api.util.updateQueryData('getConversations',undefined,draft=>{
            var found  = draft.findIndex((conversation)=>{
              return conversation.user_id == event.message.user_id;
              // conversation.conversation_id = event.message.conversation_id;
              //   conversation.conversation.last_message.text = event.message.text;
            });
            if(found==-1){
              // alert("Yes");
              // api.util.prefetch('getConversations',undefined,{force:true,});
              // const one =JSON.parse(JSON.stringify(draft[0]));
              // // const back =JSON.parse(JSON.stringify(draft[0]));
              // // const second =JSON.parse(JSON.stringify(draft[1]));

              // one.user.name = "New user";
              // one.user_id = event.message.user_id;
              // one.conversation_id = event.message.conversation_id;
              // if(one.conversation.last_message?.text)
              //   one.conversation.last_message.text = event.message.text;
              // // draft[0] =one;
              // // draft.shift();
              // draft.unshift(one);
              // // draft[1](back);
            }//
            else{
              const foundOne = draft[found];
              if(foundOne.conversation.last_message?.text)
                foundOne.conversation.last_message.text = event.message.text; 
            }
        })
      )

      dispatch<any>(
        api.util.updateQueryData("getMessages", Number(event.message.user_id), (draft) => {
          // var scrollHeight = container.current?.scrollHeight
          // previousScrollHeight.current = 500 || -1;
          
          draft.messages.push(event.message);
        }),
      ); //dispatch
    }); //echo privat chat

    return () => {
      channel.stopListening("MessageSentEvent");
    // setRightNav(false);

    };
  }, [user]);

  return (

      <div className="dark:bg-gray-700">
      <EchoConfig />

        <ToastContainer
          autoClose={1000}
          position={"top-center"}
        />
        <RouterProvider router={router} />
      </div>


  );
}

export default App;
