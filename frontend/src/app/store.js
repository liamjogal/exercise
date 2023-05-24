import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "../features/info/infoSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, infoReducer);
const store = configureStore({
  reducer: persistedReducer,
});

export default store;

export const persistor = persistStore(store);
