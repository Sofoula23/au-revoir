import React, { useState } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import logo from "../../logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { useCurrentUser } from "../../context/UserContext";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [currentUser, setUser] = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isLoggedIn = Boolean(currentUser);
  const menuId = "header-account-menu";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleMenuClose();
    setUser(null);
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className="header-app-bar">
        <Toolbar>
          <div className="header-logo">
            <RouterLink className="header-logo-link" to="/">
              <img className="header-logo-image" alt="logo" src={logo} />
              <Typography
                variant="h6"
                className={`${classes.title} header-title`}
              >
                Au Revoir!
              </Typography>
            </RouterLink>
          </div>
          {isLoggedIn && (
            <>
              <Button
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle />
                <span className="header-username">{`${currentUser.firstName} ${currentUser.lastName}`}</span>
              </Button>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
