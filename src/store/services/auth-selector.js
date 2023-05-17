import { createSelector } from "reselect";

export const selectAuthReducer = (state) => state.auth;

export const selectUser = createSelector(
  [selectAuthReducer],
  (auth) => auth.user
);

export const selectToken = createSelector(
  [selectAuthReducer],
  (auth) => auth.token
);
