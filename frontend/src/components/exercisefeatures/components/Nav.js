import * as React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Menu,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.id);
  const ref = React.useRef();

  const [chat, setChat] = useState(false);

  // React.useEffect(() => {
  //   if (chat) {
  //     navigate("/home/chat", { state: { id: id } });
  //   }
  // }, [navigate, chat]);

  const handlePageChange = (event) => {
    console.log(event);
    if (event.target.id === "Chat") {
      navigate("/home/chat", { state: { id: id } });
    } else {
      navigate("/home", { state: { id: id } });
    }
  };

  return (
    <AppBar
      id="menu-nav-bar"
      position="relative"
      color="transparent"
      sx={{ height: 75 }}
      enableColorOnDark
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Verdana",
              fontWeight: 700,
              flexgGrow: 1,
              // letterSpacing: ".25rem",
              color: blue[800],
              textDecoration: "none",
            }}
          >
            MyGym
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // TODO FIX onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexgGrow: 1,
              fontFamily: "Verdana",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: blue[800],
              textDecoration: "none",
            }}
          >
            MyGym
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              id="History"
              onClick={handlePageChange}
              sx={{ my: 2, color: blue[800] }}
            >
              Exercise History
            </Button>
            <Button
              id="Chat"
              //onClick={setChat(true)}
              onClick={handlePageChange}
              sx={{ my: 2, color: blue[800] }}
            >
              Chat
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }} ref={ref}>
            <Tooltip title="Account Info">
              <IconButton
                id="user-account"
                aria-controls="user-info"
                // onClick={handlePageChange}
                sx={{ my: 2, color: blue[800] }}
              >
                <Avatar id="avatar" sx={{ bgcolor: blue[800] }}></Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
