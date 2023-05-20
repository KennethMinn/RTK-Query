import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const INITIAL_STATES = {
  user: null,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATES,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      Cookies.set("user", JSON.stringify(state.user));
      console.log(state.user);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      Cookies.set("token", state.token);
      console.log(state.token);
    },
    removeUser(state, _) {
      state.user = null;
      Cookies.remove("user");
    },
    removeToken(state, _) {
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { setToken, setUser, removeUser, removeToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
