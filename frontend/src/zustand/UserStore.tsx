import { create } from "zustand";
import { getToken, setToken, setUserXYZ } from "../axios/tokens";
import { Data } from "./Data";

interface User {
  user: Data;
  setUser: (data: Partial<Data>) => void;
}

const userStore = create<User>()((set) => ({
  user: {
    name: "",
    user_id: "",
    email: "",
    username: "",
    token: getToken() == null ? "" : (getToken() as string),
  },

  setUser: (data) =>
    set((state) => {
      if (data.token != undefined) {
        setToken(data.token);
        if (data.user_id != undefined) setUserXYZ(data.user_id);
        // api.updateTokenInAxios(data.token)
      }
      return { user: { ...state.user, ...data } };
    }),
}));




export default userStore;

