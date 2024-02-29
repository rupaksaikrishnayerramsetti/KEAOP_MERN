import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Divider, Box, Button, Modal } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { BrowserRouter as Router, Link } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavigationBarProps } from "./NavigationBar.type";
import { style } from "../Home/Note/Note.style";
import { globalColors, globalbuttonstyle } from "../styles/Colors";
import { BASE_URL } from "../constants";

export function NavigationBar({
  isTokenCreated,
  setIsTokenCreated,
  alertCount,
  setalertCount,
  noteCount,
  setnoteCount,
}: NavigationBarProps) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const [loginflag, setloginflag] = useState(true);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handledeletepopupOpen = () => {
    setConfirmDelete(true);
  };
  const handledeletepopupClose = () => {
    setConfirmDelete(false);
  };

  const fetchAllNotesCount = async () => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      const response = await axios.get(`${BASE_URL}/getNoteCount`, {
        headers: {
          Authorization: `${jwt_token}`,
        },
      });
      setnoteCount(parseInt(response.data, 10));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllAlertsCount = async () => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      const response = await axios.get(`${BASE_URL}/getAlertCount`, {
        headers: {
          Authorization: `${jwt_token}`,
        },
      });
      console.log(parseInt(response.data, 10))
      setalertCount(parseInt(response.data, 10));
    } catch (error) {
      console.log(error);
    }
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    setIsTokenCreated(false);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ color: globalColors.backgroundcolor }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        sx={{ color: globalColors.navbarcolor }}
        onClick={handleMobileMenuClose}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <HomeIcon />
          </Badge>
        </IconButton>
        <Link style={{ textDecoration: "none" }} to="/home">
          Home
        </Link>
      </MenuItem>
      <MenuItem
        sx={{ color: globalColors.navbarcolor }}
        onClick={handleMobileMenuClose}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={alertCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Link style={{ textDecoration: "none" }} to="/remainder">
          Remainder
        </Link>
      </MenuItem>
      <MenuItem
        sx={{ color: globalColors.navbarcolor }}
        onClick={handleMobileMenuClose}
      >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={noteCount} color="error">
            <EventNoteIcon />
          </Badge>
        </IconButton>
        <Link style={{ textDecoration: "none" }} to="/note">
          Note
        </Link>
      </MenuItem>
      <MenuItem
        sx={{ color: globalColors.navbarcolor }}
        onClick={handleMobileMenuClose}
      >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge color="error">
            <MonetizationOnIcon />
          </Badge>
        </IconButton>
        <Link style={{ textDecoration: "none" }} to="/spent">
          Spent
        </Link>
      </MenuItem>
      <MenuItem sx={{ color: globalColors.navbarcolor }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handledeletepopupOpen}
        >
          <LogoutIcon />
          <Typography>Logout</Typography>
        </IconButton>
        {/* <Link to="/">Logout</Link> */}
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    if (loginflag) {
      fetchAllNotesCount();
      fetchAllAlertsCount();
      setloginflag(false);
    }
  }, [clickCount]);

  return (
    <Box
      sx={{ flexGrow: 1 }}
      onClick={() => {
        setClickCount(clickCount + 1);
      }}
    >
      <Modal
        open={confirmDelete}
        onClose={handledeletepopupClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you really want to Logout?
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            sx={{ color: globalbuttonstyle, mr: 2 }}
            onClick={() => {
              handledeletepopupClose();
              handleLogout();
            }}
          >
            YES
          </Button>
          <Button
            variant="contained"
            sx={{ color: globalbuttonstyle }} // Proper button color
            onClick={() => handledeletepopupClose()}
          >
            NO
          </Button>
        </Box>
      </Modal>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: globalColors.navbarcolor }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ fontWeight: "bolder", letterSpacing: "0.5rem" }}
          >
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              KEAOP
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/home" style={{ color: "white" }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                style={{ color: "white" }}
                title="Home"
              >
                <Badge color="error">
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1.2rem", textTransform: "UPPERCASE" }}
                  >
                    Home
                  </Typography>
                </Badge>
              </IconButton>
              {/* Home */}
            </Link>
            <Link to="/remainder" style={{ color: "white" }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                style={{ color: "white" }}
                title="Remainder"
              >
                <Badge badgeContent={alertCount} color="error">
                  {/* <NotificationsIcon /> */}
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1.2rem", textTransform: "UPPERCASE" }}
                  >
                    Remaniders
                  </Typography>
                </Badge>
              </IconButton>
              {/* Remainder */}
            </Link>
            <Link to="/note" style={{ color: "white" }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                style={{ color: "white" }}
                title="Note"
              >
                <Badge badgeContent={noteCount} color="error">
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1.2rem", textTransform: "UPPERCASE" }}
                  >
                    Notes
                  </Typography>
                </Badge>
              </IconButton>
              {/* Note */}
            </Link>
            <Link to="/spent" style={{ color: "white" }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                style={{ color: "white" }}
                title="Spent"
              >
                <Badge color="error">
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1.2rem", textTransform: "UPPERCASE" }}
                  >
                    Spent Analysis
                  </Typography>
                </Badge>
              </IconButton>
              {/* Spent */}
            </Link>
            {/* <Link
              to="/"
              style={{ color: "white" }}
              onClick={handledeletepopupOpen}
            > */}
            <IconButton
              size="large"
              aria-label="Logout"
              style={{ color: "white" }}
              title="Logout"
              onClick={handledeletepopupOpen}
            >
              <Badge>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1.2rem", textTransform: "UPPERCASE" }}
                >
                  Logout
                </Typography>
              </Badge>
            </IconButton>
            {/* Logout */}
            {/* </Link> */}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
