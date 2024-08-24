import { useCallback, useState } from "react"
import api from "../axios/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userStore from "../zustand/UserStore";

function useRegister() {
    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        loading: false
    })//useState
    const [err, setErr] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })//useState

    const navigate = useNavigate()
    const setUser = userStore().setUser;

    const updateData = useCallback(function updateData(value: Partial<typeof data>) {
        setData(prev => ({ ...prev, ...value }))
    },[])//updateValue

    const updateErr =useCallback(function updateErr(value: Partial<typeof data>) {
        setErr(prev => ({ ...prev, ...value }))
    },[])//updateValue

    const validate = useCallback( function validate() {

        var errors: Record<string, string> = {}
        updateErr({name:"",email:"",username:"",password:"",confirmPassword:""})
        var { name, email, username, password, confirmPassword } = data;

        if (name.length < 6) {
            errors.name = "Name must be at least 6"
        }
        if (email.length < 6) {
            errors.email = "email must be at least 6"
        }
        if (username.length < 6) {
            errors.username = "username must be at least 6"
        }
        if (password.length < 6) {
            errors.password = "password must be at least 6"
        }
        if (password != confirmPassword) {
            errors.confirmPassword = "confirm password not matched!"
        }
        updateErr(errors)
        return Object.keys(errors).length == 0;
    },[data])//

    const execute = useCallback(async function execute() {

        if(!validate()) return;
        updateData({loading:true})

        var { name, username, email, password, confirmPassword } = data;
        var { res, errors } = await api.send("/register", { name, username, email, password, confirmPassword })

        updateData({loading:false})

        if (errors == null) {
            toast.success(res.msg,{position:"top-center",autoClose:2000})
            setUser({token:res.token,user_id:res.data.id})

            
            return;
        }//if success

        updateErr(errors)

    },[data])//execute

    return { data, err, updateData, execute }
}

export default useRegister