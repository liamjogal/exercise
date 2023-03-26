import * as React from "react";
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import { accountContext } from "../Login";
import { AccountContext } from "../../context/AccountContext";
import { Button } from "@mui/material";
import { Typography, Menu, MenuItem, MenuList, Paper } from "@mui/material";
import { BrowserRouter, Route, Router, Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
export default function Profile() {
  // const [edit, setEdit] = React.useState(false);
  // const navigate = useNavigate();

  // // React.useEffect(() => {
  // //   if (edit) {
  // //     navigate("/edit_profile", {});
  // //   }
  // // }, [edit, navigate]);
  const { state } = React.useContext(AccountContext);
  console.log(state);
  return (
    <>
      <Grid container m={0.5} spacing={10} alignItems="center">
        <Grid item>
          <Avatar sx={{ width: 56, height: 56 }}></Avatar>
        </Grid>

        <Grid item>
          <h1>{state.username}</h1>
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
            <Typography></Typography>{" "}
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
          <Typography></Typography>
        </Grid>
      </Grid>
      <Grid container m={0.5} spacing={10} alignItems="center">
        <Grid item>
          <Typography>Posts</Typography>
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
