import { createSlice } from "@reduxjs/toolkit";
import State from "../State";

const initialState = {
  token: null,
  loadingToken: State.NOT_PROCESSED,
  errorToken: null,
  userData: null,
};

const slice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loadingToken = State.PROCESSING;
    },
    loginFail(state, action) {
      state.loadingToken = State.FAILED;
      state.errorToken = action.payload;
    },
    loginSuccess(state, action) {
      state.loadingToken = State.DONE;
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
    registerStart(state) {
      state.loadingToken = State.PROCESSING;
    },
    registerFail(state, action) {
      (state.loadingToken = State.FAILED), (state.errorToken = action.payload);
    },
    registerSuccess(state, action) {
      state.loadingToken = State.DONE;
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
    logout(state) {
      state.token = null;
      state.userData = null;
    },

    updateUser(state, action) {
      state.userData = action.payload;
    },
  },
});
export const AuthSlice = slice;
export const {
  registerFail,
  registerStart,
  registerSuccess,
  loginFail,
  loginStart,
  loginSuccess,
  logout,
  updateUserPic,
  updateUser,
} = slice.actions;
