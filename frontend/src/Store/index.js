import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { HomeSlice } from "./Home/Reducers";
import { AuthSlice } from "./Auth/Reducers";

export default configureStore({
  reducer: {
    Home: HomeSlice.reducer,
    Auth: AuthSlice.reducer,
  },
  middleware: [thunk],
});
