import * as React from "react";
import { useSelector, useDispatch, getState } from "react-redux";
import infoSlice, {
  setUsername,
  setPassword,
  setPrivacy,
  setBio,
  setExercisetype,
  setExercises,
  setPosts,
} from "./infoSlice";

import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";

import { Button } from "@mui/material";
import { Typography, Menu, MenuItem, MenuList, Paper } from "@mui/material";

export function Info() {
  // const [username, password, privacy, bio, exercise_type, exercises, posts] =
  //   useSelector(
  //     (state) => state.setUsername.value,
  //     state.setPassword.value,
  //     state.setPrivacy.value,
  //     state.setBio.value,
  //     state.setExercisetype.value,
  //     state.setExercises.value,
  //     state.setPosts.value
  //   );

  const dispatch = useDispatch();

  const info = useSelector((state) => state.info);

  console.log("info");
  console.log(info);

  const curr = infoSlice.getState();
  console.log(curr);

  return (
    <>
      <Grid container m={0.5} spacing={10} alignItems="center">
        <Grid item>
          <Avatar sx={{ width: 56, height: 56 }}></Avatar>
        </Grid>

        <Grid item>
          <h1>{curr.username}</h1>
        </Grid>
        <Grid item>
          <Button variant="contained" style={{ display: "block" }}>
            <Typography>Followers</Typography>
            <Typography></Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" style={{ display: "block" }}>
            <Typography>Following</Typography>
            <Typography>{curr.followers}</Typography>{" "}
          </Button>
        </Grid>
      </Grid>
      <Grid container m={0.5} spacing={10} alignItems="center">
        <Grid item>
          <Button variant="contained">Edit Profile</Button>
        </Grid>
      </Grid>
      <Grid container m={0.5} spacing={10} alignItems="center">
        <Grid item>
          <Typography>Execise Preference</Typography>
          <Typography></Typography>
        </Grid>
        <Grid item>
          <Typography>Bio</Typography>
          <Typography>{curr.bio}</Typography>
        </Grid>
      </Grid>
      <Grid container m={0.5} spacing={10} alignItems="center">
        <Grid item>
          <Typography>Posts</Typography>
          <Typography>{curr.posts}</Typography>
          <MenuList sx={{ flex: 1 }}>
            {/* {state.profile.posts.map((post) => (
            <MenuItem id={post} key="Nav">
              <Typography textAlign="center">{post}</Typography>
            </MenuItem>
          ))} */}
          </MenuList>
        </Grid>
        <Grid item>
          <Typography>History</Typography>
          <MenuList
            keepMounted
            sx={{
              flex: 1,
            }}
          >
            {/* {state.profile.exercises.map((exercise) => (
            <MenuItem>
              <Typography textAlign="center">
                {exercise.exercise}
              </Typography>
            </MenuItem>
          ))} */}
          </MenuList>
        </Grid>
      </Grid>
    </>
  );
}
