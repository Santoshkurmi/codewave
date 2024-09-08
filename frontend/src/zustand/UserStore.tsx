import { create } from "zustand";
// import { getToken, setToken, setUserXYZ } from "../axios/tokens";
import { Data } from "./Data";

interface User {
  user: Data;
  setUser: (data: Partial<Data>) => void;
}

const userStore = create<User>((set) => ({
  user: {
    name: "",
    user_id: "",
    email: "",
    username: "",
    token:"",
  },

  /**
   * Updates the current user data in the store.
   * If the passed data contains a token, it will be saved to local storage.
   * If the passed data contains a user_id, it will be saved to local storage.
   * @param data Partial user data to be updated.
   * @returns The new state of the user.
   */
  setUser: (data: Partial<Data>) =>
    set((state) => {
      const newState = { ...state.user, ...data };

      // if (newState.token) {
      //   // setToken(newState.token);
      // }

      // if (newState.user_id) {
      //   // setUserXYZ(newState.user_id);
      // }

      return { user: newState };
    }),
}));




export default userStore;

