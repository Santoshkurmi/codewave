import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Home from "./components/home/Home.tsx";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import userStore from "./zustand/UserStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Messages from "./components/message/Messages";
import ListMessages from "./components/message/ListMessages";
import Test from "./tests/Test";
import { createElement } from "react";
import Profile from "./components/profile/profile";
import Feeds from "./components/feed/Feeds";
import AddPost from "./components/add_post/AddPost";
import { store } from './api/store.ts'
import { Provider } from "react-redux";
import UpdatePost from "./components/add_post/UpdatePost.tsx";
import ViewAnswers from "./components/post/ViewAnswers.tsx";


function App() {
  const token = userStore().user.token;

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
          element: <Messages />,
        },
        {
          path: "messages/:user_id",
          element: <ListMessages />,
        },
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

  return (
    <Provider store={store}>

      <div className="dark:bg-gray-700">
        <ToastContainer
          autoClose={1000}
          position={"top-center"}
        />
        <RouterProvider router={router} />
      </div>

    </Provider>

  );
}

export default App;
