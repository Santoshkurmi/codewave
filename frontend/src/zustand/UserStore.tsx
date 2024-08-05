import { create } from "zustand";
import { getToken, setToken } from "../axios/tokens";
import api from "../axios/api";


interface Data {
  name: string,
  email: string,
  username: string,
  token: string
}

interface User {
  user: Data,
  setUser: (data: Partial<Data>) => void
}



const userStore = create<User>()((set) => ({

  user: { name: "", email: "", username: "", token: getToken() == null ? "" : getToken() as string },

  setUser: (data) => set((state) => {
    if (data.token != undefined) {
      setToken(data.token)
      // api.updateTokenInAxios(data.token)
    }
    return ({ user: { ...state.user, ...data } })
  }
  ),
}));

export default userStore