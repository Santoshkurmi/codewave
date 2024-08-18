import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import userStore from "./zustand/UserStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Messages from "./components/message/Messages";
import ListMessages from "./components/message/ListMessages";
import Test from "./tests/Test";


function App() {
  //There are so many things happening in this world
  const token = userStore().user.token;

  // echo.join('message.sent.1')
  // pusherJs
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
          path: "popMessages",
          element: <Messages />,
        },
        {
          path: "popMessages/:user_id",
          element: <ListMessages />,
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
  // if (token)

  return (
    <div>
      <ToastContainer autoClose={2000} position={"top-center"} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App

