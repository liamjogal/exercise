import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "../features/info/infoSlice";
const store = configureStore({
  reducer: {
    info: infoReducer,
  },
});

export default store;
