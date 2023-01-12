import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { blue } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Main from "./exercise_data/Main";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export function userState(state) {
  return state;
}

export default function Login() {
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [loggedin, setLoggedin] = React.useState(false);
  const [account, setAccount] = React.useState({});
  const [profile, setProfile] = React.useState({});
  const [info, setInfo] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedin) {
      navigate("/home", {
        state: { id: info._id, added: 0, context: account, smContext: profile },
      });
    }
  }, [loggedin, navigate]);

  async function register(name, password) {
    console.log(`trying to register ${name} and ${password}`);
    await axios
      .post("http://localhost:4000/createUser", {
        name: name,
        password: password,
      })
      .catch((err) => {
        if (err && err.response.status === 422) alert(err.response.data);
      })
      .then((res, err) => {
        if (err && res.status === 422) alert(res.data);
      });
  }

  async function login(name, password) {
    console.log(`trying to login ${name} and ${password}`);
    await axios
      .get("http://localhost:4000/login", {
        params: { name: name, password: password },
      })
      .catch((err) => {
        if (err && err.response.status === 404) alert(err.response.data);
        return;
      })
      .then((res) => {
        if (res.status === 200) {
          // userState({
          //   username: name,
          //   password: password,
          //   privacy: res.data.privacy,
          //   valid: true,
          //   exercises: res.data.exercises,
          // });
          setAccount({
            username: name,
            password: password,
            privacy: res.data.account.privacy,
            valid: true,
            exercises: res.data.account.exercises,
            profile: {
              user: res.data.smInfo.user,
              followers: res.data.smInfo.followers,
              following: res.data.smInfo.following,
              privacy: res.data.smInfo.privacy,
              bio: res.data.smInfo.bio,
              exercise_type: res.data.smInfo.exercise_type,
              exercises: res.data.smInfo.exercises,
              posts: res.data.smInfo.posts,
            },
          });
          setInfo(res.data.account);

          setProfile(res.data.smInfo);
          setLoggedin(true);
        }
        console.log(res);
      });
  }

  const handleUsername = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleRegistration = (event) => {
    register(username, password);
  };

  const handleLogin = (event) => {
    login(username, password);
  };

  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="a"
        alignItems="center"
        justifyContent="center"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "Verdana",
          fontSize: 50,
          fontWeight: 700,
          flexgGrow: 1,
          // letterSpacing: ".25rem",
          color: blue[800],
          textDecoration: "none",
          padding: 10,
        }}
      >
        Only Gains
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          postion: "absolute",
          top: 50,
          padding: 15,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "column" }}
          spacing={{ xs: 1, sm: 1, md: 1 }}
          align
          items="center"
          alignContent="center"
        >
          <TextField
            id="username-input"
            label="Username"
            variant="outlined"
            onChange={handleUsername}
          />
          <TextField
            id="password-input"
            label="Password"
            variant="outlined"
            onChange={handlePassword}
          />
          <Button sx={{ color: blue[800] }} onClick={handleLogin}>
            Login
          </Button>
          <Button sx={{ color: blue[800] }} onClick={handleRegistration}>
            {/* fix make sign up js file later */}
            <Link to="/signup">Sign Up</Link>
          </Button>
        </Stack>
      </Box>
    </>
  );
}
