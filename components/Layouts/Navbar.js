import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AccountCircle } from "@material-ui/icons";
import {
  useStyles,
  HideOnScroll,
  MobileMenuPopup,
  ProfileMenuPopup,
} from "./NavbarHelper";
import MyLink from "../MyLink";
import styles from "./styles.module.css";
import { isServer, removeGmailTag, showLoginForm } from "../../utils/Helper";
import Login from "../../container/Login";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/Cookies";
import { constAuth } from "../../utils/Constant";
import { actionSetUser } from "../../redux/actions/userActions";
import { serviceLogout } from "../../service/authenticate";
function Navbar(props) {
  // VARIABLES:
  const classes = useStyles();
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isProfileMenuOpen = Boolean(anchorProfileEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const _isLogined = useSelector(
    (state) => state.login && state.login.isLogined
  );
  // UI INTERACT
  const handleProfileMenuOpen = (event) => {
    setAnchorProfileEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorProfileEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(serviceLogout(handleProfileMenuClose));
  };
  // HELPERS:
  const handleExtractUserData = () => {
    if (!isServer && _isLogined) {
      const jwt = getCookie(constAuth.JWT);
      const decode = jwt_decode(jwt);
      const email = decode && decode.sub;
      const newUser = { ...user, email: email };
      dispatch(actionSetUser(newUser));
    }
  };
  const profileId = "profile-menu-popup";

  const mobileMenuId = "primary-search-account-menu-mobile";
  // LIFE CYCLE HOOK:
  useEffect(() => {
    handleExtractUserData();
  }, [_isLogined]);
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar color="primary">
          <Container>
            <Toolbar>
              <MyLink variant="h6" url="/" className={classes.title}>
                Neko-kun
              </MyLink>

              <div className={classes.sectionDesktop}>
                <MyLink
                  variant="h6"
                  className={classes.navItem}
                  url="/top-student"
                >
                  Top Student
                </MyLink>
                <MyLink
                  variant="h6"
                  className={classes.navItem}
                  url="/top-student"
                >
                  News
                </MyLink>
                <MyLink
                  variant="h6"
                  className={classes.navItem}
                  url="/top-student"
                >
                  About Neko
                </MyLink>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="secondary"
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <div className={classes.grow} />
              <div className={classes.roomEnter}>
                <MyLink variant="h6" url="/study-room">
                  <Button
                    color="secondary"
                    variant="outlined"
                    className={styles.flashEffect}
                  >
                    STUDY NOW
                  </Button>
                </MyLink>
              </div>
              {_isLogined && (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={profileId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="secondary"
                >
                  <Typography
                    className={classes.responsiveUserInfoDesktop}
                    variant="caption"
                  >
                    {removeGmailTag(user && user.email)}
                  </Typography>
                  <AccountCircle />
                </IconButton>
              )}
              {!_isLogined && (
                <div onClick={() => showLoginForm()}>
                  <MyLink variant="h6" className={classes.navItem}>
                    Login
                  </MyLink>
                </div>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <ProfileMenuPopup
        anchorProfileEl={anchorProfileEl}
        isProfileMenuOpen={isProfileMenuOpen}
        handleProfileMenuClose={handleProfileMenuClose}
        handleLogout={handleLogout}
        profileId={profileId}
        user={user}
      />
      <MobileMenuPopup
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        mobileMenuId={mobileMenuId}
        className={classes.mobileMenu}
      />
      <Login />
    </React.Fragment>
  );
}

export default Navbar;
