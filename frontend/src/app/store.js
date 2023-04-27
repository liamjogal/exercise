<<<<<<< HEAD
import { configueStore } from "@reduxjs/toolkit";

export default configueStore({
  name: "user",
  initialState: {
    username: name,
    password: password,
    privacy: res.data.privacy,
    valid: true,
    exercises: res.data.exercises,
    profile: {
      user: res.data.username,
      followers: res.data.smInfo.followers,
      following: res.data.smInfo.following,
      privacy: res.data.smInfo.privacy,
      bio: res.data.smInfo.bio,
      exercise_type: res.data.smInfo.exercise_type,
      exercises: res.data.smInfo.exercises,
      posts: res.data.smInfo.posts,
    },
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setValid: (state, action) => {
      state.valid = action.payload;
    },

    setPrivacy: (state, action) => {
      state.privacy = action.payload;
    },

    setExercises: (state, action) => {
      state.exercises = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});
=======
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
>>>>>>> 259ad731179d698176a8948e254af58b6074e9f2
