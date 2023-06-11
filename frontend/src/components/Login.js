import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { blue } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";
import store from "../app/store";
import { useDispatch } from "react-redux";
import "../App.css";
import {
  setId,
  setUsername,
  setPassword,
  setPrivacy,
  setBio,
  setExercisetype,
  setExercises,
  setPosts,
} from "../features/info/infoSlice";

export function userState(state) {
  return state;
}

export default function Login() {
  const [nameInput, setnameInput] = React.useState(null);
  const [passwordInput, setpasswordInput] = React.useState(null);
  const [loggedin, setLoggedin] = React.useState(false);
  const [account, setAccount] = React.useState({});
  const [profile, setProfile] = React.useState({});
  const [context, setContext] = React.useState(AccountContext);
  // const [id, setId] = React.useState(null);
  var id = null;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const location = useLocation();

  React.useEffect(() => {
    if (loggedin) {
      console.log("setting state");
      navigate("/home", {
        state: { id: id },
      });
    }
  }, [loggedin, navigate]);

  const register = async (name, password) => {
    console.log(`trying to register ${name} and ${password}`);
    await axios
      .post("http://localhost:4000/create", {
        name: name,
        password: password,
      })
      .catch((err) => {
        if (err && err.response.status === 422) alert(err.response.data);
      })
      .then((res, err) => {
        if (err && res.status === 422) alert(res.data);
      });
  };

  const login = async (name, password) => {
    console.log(`trying to login ${name} and ${password}`);
    await axios
      .post("http://localhost:4000/login", {
        params: { name: name, password: password },
      })
      .catch((err) => {
        if (err && err.response.status === 404) alert(err.response.data);
        return;
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setId(res.data._id));
          dispatch(setUsername(res.data.username));
          dispatch(setPassword(password));
          dispatch(setPrivacy(res.data.smInfo.privacy));
          dispatch(setBio(res.data.smInfo.bio));
          dispatch(setExercisetype(res.data.smInfo.exercise_type));
          res.data.exercises.forEach((val) => {
            delete Object.assign(val, { id: val._id })["_id"];
          });
          dispatch(setExercises(res.data.exercises));
          dispatch(setPosts(res.data.smInfo.posts));
          id = res.data.id;
          setLoggedin(true);
        }
        console.log(res);
      });
  };

  const handlenameInput = (event) => {
    setnameInput(event.target.value);
    console.log(nameInput);
  };

  const handlepasswordInput = (event) => {
    setpasswordInput(event.target.value);
    console.log(passwordInput);
  };

  const handleRegistration = (event) => {
    register(nameInput, passwordInput);
  };

  const handleLogin = (event) => {
    login(nameInput, passwordInput);
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
        MyGym
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
            onChange={handlenameInput}
          />
          <TextField
            id="password-input"
            label="Password"
            variant="outlined"
            onChange={handlepasswordInput}
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
