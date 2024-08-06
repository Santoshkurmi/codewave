import { Navigate, RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import userStore from "./zustand/UserStore";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Messages from "./components/message/Messages";
import ListMessages from "./components/message/ListMessages";

function  App() {

    const token = userStore().user.token
    const router = createBrowserRouter([
        {
            path: '/',
            element:token? <Home />:<Navigate to='/login'/>,
            errorElement:<div className="flex flex-col h-[100vh] justify-center items-center">
                <h1 className="text-2xl text-gray-500 font-bold">Error occured</h1>
                <h1 className="text-2xl text-gray-500 font-bold">Page Not Found</h1>
            </div>,
            children:[
                {
                    path:'popMessages',
                    element:<Messages/>
                },
                {
                    path:'popMessages/:user',
                    element:<ListMessages/>
                },
            ]
        },
        {
            path: '/login',
            element:token? <Navigate to='/'/>: <Login />
        },
        {
            path: '/register',
            element:token? <Navigate to='/'/>: <Register />
        },
    ]);
    console.log("Bye")
    return (
        <div>
            <ToastContainer/>
            <RouterProvider router={router} />
        </div>
    )
}

export default App