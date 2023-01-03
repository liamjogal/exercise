import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import { IconButton, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu } from "@mui/material";

import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import * as React from "react";
import { blue } from "@mui/material/colors";

import Friends from "./pages/Friends";
import History from "./pages/History";

import Settings from "../user_info/Settings";

import Profile from "../user_info/profile";

function Main() {
  const ref = React.useRef();

  const pages = ["My Exercise", "Friends"];

  const accountOptions = ["Settings", "Log Out"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Set to show deals first
  const [showUpdate, setShowUpdate] = React.useState(true);
  const [showFriends, setShowFriends] = React.useState(false);

  const [showHistory, setShowHistory] = React.useState(true);
  const [showSettings, setShowSettings] = React.useState(false);

  // TODO: Fix Menu to set Menu Deals and Friends to show based off button pressed using hooks

  const setDocument = (
    update = false,
    history = false,
    friends = false,
    settings = false
  ) => {
    setShowUpdate(update);
    setShowHistory(history);
    setShowFriends(friends);
    setShowSettings(settings);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageChange = (event) => {
    switch (event.currentTarget.id) {
      default:
        setDocument(true, false, false, false);
        break;
      case "New Exercise":
        setDocument(true, false, false, false);
        break;
      case "History":
        setDocument(false, true, false, false);
        break;
      case "Friends":
        setDocument(false, false, true, false);
        break;

      case "Settings":
        setDocument(false, false, false, true);
        setAnchorElUser(null);
        break;
      case "Log Out": // TODO add some way of alerting the user to make sure they want to log out
        setAnchorElUser(null);
        break;
    }
  };

  return (
    <>
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
              GymRat
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem id={page} key="Nav" onClick={handlePageChange}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
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
              GymRat
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                id="History"
                key="fbutt"
                onClick={handlePageChange}
                sx={{ my: 2, color: blue[800] }}
              >
                My Exercise
              </Button>
              <Button
                id="Friends"
                key="fbutt"
                onClick={handlePageChange}
                sx={{ my: 2, color: blue[800] }}
              >
                Friends
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0 }} ref={ref}>
              <Tooltip title="Account Info">
                <IconButton
                  aria-controls="user-info"
                  onClick={handleOpenUserMenu}
                  onClose={handleCloseUserMenu}
                  sx={{ my: 2, color: blue[800] }}
                >
                  <Avatar id="avatar" sx={{ bgcolor: blue[800] }}></Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                id="user-info"
                anchorEl={anchorElUser}
                key="Info"
                open={Boolean(anchorElUser)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                container={ref.current}
                onClose={handleCloseUserMenu}
              >
                {accountOptions.map((option) => (
                  <MenuItem id={option} onClick={handlePageChange}>
                    <Typography textAlign="center">{option}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {showHistory && <History></History>}
      {showFriends && <Friends></Friends>}
      {showSettings && <Settings></Settings>}
    </>
  );
}

export default Main;
