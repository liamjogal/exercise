import * as React from "react";

export const AccountContext = React.createContext({
  username: "",
  password: "",
  privacy: "",
  valid: false,
  exercises: {},
  profile: {
    user: "",
    followers: [],
    following: [],
    privacy: false,
    bio: "",
    exercise_type: "",
    exercises: [],
    posts: [],
  },
});
