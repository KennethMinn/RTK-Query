import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../store/api/authApi";

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
});
