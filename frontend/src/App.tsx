import { Navigate, RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import userStore from "./zustand/UserStore";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const token = userStore().user.token
    const router = createBrowserRouter([
        {
            path: '/',
            element:token? <Home />:<Navigate to='/login'/>
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

    return (
        <div>
            <ToastContainer/>
            <RouterProvider router={router} />
        </div>
    )
}

export default App