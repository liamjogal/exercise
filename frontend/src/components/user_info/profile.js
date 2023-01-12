import * as React from "react";
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import { accountContext } from "../Login";
import { AccountContext } from "../../context/AccountContext";
import { Button } from "@mui/material";
import { Typography, Menu, MenuItem, MenuList, Paper } from "@mui/material";

export default function Profile() {
  return (
    <AccountContext.Consumer>
      {(account) => (
        <>
          <Grid container m={0.5} spacing={10} alignItems="center">
            <Grid item>
              {" "}
              <Avatar sx={{ width: 56, height: 56 }}></Avatar>
            </Grid>

            <Grid item>
              <h1>{account.profile.user}</h1>
            </Grid>
            <Grid item>
              <Button variant="contained" style={{ display: "block" }}>
                <Typography>Followers</Typography>
                <Typography>{account.profile.followers.length}</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" style={{ display: "block" }}>
                <Typography>Following</Typography>
                <Typography>{account.profile.following.length}</Typography>{" "}
              </Button>
            </Grid>
          </Grid>
          <Grid container m={0.5} spacing={10} alignItems="center">
            <Grid item>
              <Button variant="contained"> Edit Profile </Button>
            </Grid>
          </Grid>
          <Grid container m={0.5} spacing={10} alignItems="center">
            <Grid item>
              <Typography>Execise Preference</Typography>
              <Typography>{account.profile.exercise_type}</Typography>
            </Grid>
            <Grid item>
              <Typography>Bio</Typography>
              <Typography>{account.profile.bio}</Typography>
            </Grid>
          </Grid>
          <Grid container m={0.5} spacing={10} alignItems="center">
            <Grid item>
              <Typography>Posts</Typography>
              <MenuList sx={{ flex: 1 }}>
                {account.profile.posts.map((post) => (
                  <MenuItem id={post} key="Nav">
                    <Typography textAlign="center">{post}</Typography>
                  </MenuItem>
                ))}
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
                {account.profile.exercises.map((exercise) => (
                  <MenuItem>
                    <Typography textAlign="center">
                      {exercise.exercise}
                    </Typography>
                  </MenuItem>
                ))}
              </MenuList>
            </Grid>
          </Grid>
        </>
      )}
    </AccountContext.Consumer>
  );
}
