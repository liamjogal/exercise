import AppBar from '@mui/material/AppBar';
// Kinda know. IDRK
import Container from '@mui/material/Container';
// No clue. IDRK
import Toolbar from '@mui/material/Toolbar';  
// I think this makes the app bar a specific size
// disableGutters IDRK
import AdbIcon from '@mui/icons-material/Adb'; 
// Some icon from materialui (looks cool but change to something else later)
import Typography from '@mui/material/Typography';
// Lets you customize text
// variant lets you determine the html element (h6 is the 6th smallest header I think)
// noWrap makes it so words don't wrap onto another but just truncate I think
// component defines the html element or component for the root node. IDRK 
// href provides a link, doesn't work if no component="a"
// sx provides overides for CSS and additional CSS styles
import Box from '@mui/material/Box';
// Box component serves as a wrapper component for most of the CSS utility needs.
import { IconButton, MenuItem } from '@mui/material';
// Button to put an icon in I think
import MenuIcon from '@mui/icons-material/Menu';
import {Menu} from '@mui/material';
// Display a list of services
// id is a css selector to identify that specific element
// anchorEl HTML element or a function that returns an HTML element (used to set position of the Menu), in this case the html element anchorElNav returned by the state hook on line 38
// anchorOrigin point where the anchorEl attaches to, used when anchorReference is anchorEl
// transformOrigin This is the point on the popover which will attach to the anchor's origin
// open shows element if true TODO: Continue from here
import Button from '@mui/material/Button';
import {Tooltip} from '@mui/material';
import Avatar from '@mui/material/Avatar';





import * as React from 'react';
import { lightBlue } from '@mui/material/colors';


const pages = ["Drinks", "Food", "Cart"]

const drinks = ["Beer", "Cocktails", "Wine", "Non-Alcoholic"]

function OrderBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElItems, setAnchorElItems] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  };

  const handleOpenItemsMenu = (event) => {
    setAnchorElItems(event.currentTarget)
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseItemsMenu = () => {
    setAnchorElItems(null);
  };
    return (
      <AppBar position="static" color="transparent" enableColorOnDark>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
            variant="h6"
            noWrap
            component="a"
            href='/'
            sx={{
              mr:2,
              display:{xs:'none', md:'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              flexgGrow: 1,
              letterSpacing: '.25rem',
              color: lightBlue[500],
              textDecoration:'none'
            }}>
              TABSTER
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton 
               size="large"
               aria-label="account of current user"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               onClick={handleOpenNavMenu}
               color="inherit">
                <MenuIcon/>
              </IconButton>
               <Menu
               id="menu-appbar"
               anchorEl={anchorElNav}
               anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
               }}
               keepMounted
               transformOrigin={{
                vertical:'top',
                horizontal:'left'
              }}
               open={Boolean(anchorElNav)}
               onClose={handleCloseNavMenu}
               sx={{
                display:{xs:'block', md:'none'}
               }} 
               >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
               </Menu> 
            </Box>
            <AdbIcon sx={{display: {xs: 'flex', md:'none'}, mr: 1}}></AdbIcon>
            <Typography
             variant="h5"
             noWrap
             component="a"
             href=""
             sx={{
              mr: 2,
              display:{xs:'flex', md: 'none'},
              flexgGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: lightBlue[500],
              textDecoration: 'none'
             }}
             >
              TABSTER
             </Typography>
             <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex'}}}>
              {pages.map((page) => (
                <><Button
                  aria-controls='menu-items'
                  key={page}
                  onClick={handleOpenItemsMenu}
                  sx={{ my: 2, color: lightBlue[500] }}>
                  {page}
                </Button><Menu
                  anchorEl = {anchorElItems}
                  id='menu-items'
                  onClick = {handleCloseItemsMenu}
                  key={page}
                  open={Boolean(anchorElItems)}>
                    {drinks.map((drink) => (
                      <MenuItem key={drink} onClick={handleCloseItemsMenu}>
                      <Typography textAlign="center">{drink}</Typography>
                    </MenuItem>
                    ))}
                  </Menu></>

              ))}
             </Box>
             <Box sx={{flexGrow: 0 }}>
              <Tooltip title="Account Info">
                <IconButton onClick={handleOpenUserMenu} sx={{p:0}}>
                  <Avatar sx={{ bgcolor: lightBlue[500]}}></Avatar>
                </IconButton>
              </Tooltip>
             </Box>
             <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />


          </Toolbar>

        </Container>
      </AppBar>
      );
}

export default OrderBar;
