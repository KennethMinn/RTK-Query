import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../store/api/authApi";
import { authReducer } from "./services/auth-reducer";

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
});
