import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATES = {
  user: null,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATES,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      console.log(state.token);
    },
  },
});

export const { setToken, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
