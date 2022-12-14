import AppBar from "@mui/material/AppBar";
// Kinda know. IDRK
import Container from "@mui/material/Container";
// No clue. IDRK
import Toolbar from "@mui/material/Toolbar";
// I think this makes the app bar a specific size
// disableGutters IDRK
// Some icon from materialui (looks cool but change to something else later)
import Typography from "@mui/material/Typography";
// Lets you customize text
// variant lets you determine the html element (h6 is the 6th smallest header I think)
// noWrap makes it so words don't wrap onto another but just truncate I think
// component defines the html element or component for the root node. IDRK
// href provides a link, doesn't work if no component="a"
// sx provides overides for CSS and additional CSS styles
import Box from "@mui/material/Box";
// Box component serves as a wrapper component for most of the CSS utility needs.
import { IconButton, MenuItem } from "@mui/material";
// Button to put an icon in I think
import MenuIcon from "@mui/icons-material/Menu";
import { Menu } from "@mui/material";
// Display a list of services
// id is a css selector to identify that specific element
// anchorEl HTML element or a function that returns an HTML element (used to set position of the Menu), in this case the html element anchorElNav returned by the state hook on line 38
// anchorOrigin point where the anchorEl attaches to, used when anchorReference is anchorEl
// transformOrigin This is the point on the popover which will attach to the anchor's origin
// open shows element if true TODO: Continue from here
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import * as React from "react";
import { purple } from "@mui/material/colors";

import Exercise from "./pages/Exercise";

import Friends from "./pages/Friends";
import History from "./pages/History";

import Settings from "../user_info/Settings";

// const drinks = ["Beer", "Cocktails", "Wine", "Non-Alcoholic"]

function Main() {
  const ref = React.useRef();

  const pages = ["New Exercise", "History", "Friends"];

  const accountOptions = ["Settings", "Log Out"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Set to show deals first
  const [showUpdate, setShowUpdate] = React.useState(true);
  const [showFriends, setShowFriends] = React.useState(false);

  const [showHistory, setShowHistory] = React.useState(false);
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
                color: purple[800],
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
                color: purple[800],
                textDecoration: "none",
              }}
            >
              GymRat
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                id="New Exercise"
                onClick={handlePageChange}
                sx={{ my: 2, color: purple[800] }}
              >
                New Exercise
              </Button>

              <Button
                id="History"
                key="fbutt"
                onClick={handlePageChange}
                sx={{ my: 2, color: purple[800] }}
              >
                History
              </Button>
              <Button
                id="Friends"
                key="fbutt"
                onClick={handlePageChange}
                sx={{ my: 2, color: purple[800] }}
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
                  sx={{ my: 2, color: purple[800] }}
                >
                  <Avatar id="avatar" sx={{ bgcolor: purple[800] }}></Avatar>
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
      {showUpdate && <Exercise></Exercise>}
      {showHistory && <History></History>}
      {showFriends && <Friends></Friends>}
      {showSettings && <Settings></Settings>}
    </>
  );
}

export default Main;
