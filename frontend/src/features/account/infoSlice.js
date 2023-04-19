import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  username: "",
  password: "",
  followers: 0,
  following: 0,
  privacy: "",
  bio: "",
  exercise_type: "",
  exercises: "",
  posts: 0,
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setId: (state, action) => {
      state._id = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },

    setPrivacy: (state, action) => {
      state.privacy = action.payload;
    },

    setBio: (state, action) => {
      state.bio = action.payload;
    },

    setExercisetype: (state, action) => {
      state.exercise_type = action.payload;
    },

    setExercises: (state, action) => {
      state.exercises = action.payload;
    },

    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const {
  setUsername,
  setPassword,
  setPrivacy,
  setBio,
  setExercisetype,
  setExercises,
  setPosts,
} = infoSlice.actions;

export default infoSlice.reducer;
