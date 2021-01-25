import Link from "next/link";
import { useState } from "react";

import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AccountCircle } from "@material-ui/icons";
import {
  useStyles,
  HideOnScroll,
  renderProfileMenuF,
  renderMobileMenuF,
} from "./NavbarHelper";
import MyLink from "../MyLink";
function Navbar(props) {
  const classes = useStyles();
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isProfileMenuOpen = Boolean(anchorProfileEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const profileId = "profile-menu-popup";
  const profileMenuPopup = renderProfileMenuF({
    anchorProfileEl,
    isProfileMenuOpen,
    handleProfileMenuClose,
    profileId,
  });

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = renderMobileMenuF({
    mobileMoreAnchorEl,
    isMobileMenuOpen,
    handleMobileMenuClose,
    mobileMenuId,
    className: classes.mobileMenu,
  });

  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar color="primary">
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
                Top Student
              </MyLink>
              <MyLink
                variant="h6"
                className={classes.navItem}
                url="/top-student"
              >
                Top Student
              </MyLink>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div className={classes.grow} />
            <div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={profileId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderMobileMenu}
      {profileMenuPopup}
    </React.Fragment>
  );
}

export default Navbar;