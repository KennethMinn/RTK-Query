import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../store/api/authApi";
import { authReducer } from "./services/auth-reducer";
import { contactApi } from "./api/contactApi";

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  auth: authReducer,
});
