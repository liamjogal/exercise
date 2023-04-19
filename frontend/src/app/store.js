import { configureStore } from "@reduxjs/toolkit";
import { infoSlice } from "../features/account/infoSlice";
import { accountApi } from "../features/account/acccountAPI";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    info: infoSlice,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(accountApi.middleware),
  },
});

setupListeners(store.dispatch);
