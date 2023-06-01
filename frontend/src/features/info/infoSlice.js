import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  password: "",
  followers: 0,
  following: 0,
  privacy: "",
  bio: "",
  exercise_type: "",
  exercises: [],
  posts: 0,
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
      return state;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
      return state;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
      return state;
    },

    setPrivacy: (state, action) => {
      state.privacy = action.payload;
      return state;
    },

    setBio: (state, action) => {
      state.bio = action.payload;
      return state;
    },

    setExercisetype: (state, action) => {
      state.exercise_type = action.payload;
      return state;
    },

    setExercises: (state, action) => {
      state.exercises = action.payload;
      return state;
    },

    pushExercise: (state, action) => {
      state.exercises.push(action.payload);
      return state;
    },

    popExercise: (state, action) => {
      state.exercises.pop(action.payload);
      return state;
    },

    setPosts: (state, action) => {
      state.posts = action.payload;
      return state;
    },
  },
});

export const {
  setId,
  pushExercise,
  popExercise,
  setUsername,
  setPassword,
  setPrivacy,
  setBio,
  setExercisetype,
  setExercises,
  setPosts,
} = infoSlice.actions;

export default infoSlice.reducer;
