import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { lightBlue } from "@mui/material/colors";
import TextField from "@mui/material/TextField";

export default function Login() {
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const handleUsername = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(password);
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
          letterSpacing: ".25rem",
          color: lightBlue[500],
          textDecoration: "none",
          padding: 10,
        }}
      >
        Trackercise
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
          <Button>Login</Button>
          <Button>Sign Up</Button>
        </Stack>
      </Box>
    </>
  );
}
