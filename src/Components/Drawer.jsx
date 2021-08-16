import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";

import { Avatar, ListItemAvatar } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";

import Dashboard from "../Screens/Dashboard";
import Ledger from "../Screens/Ledger";
import AddExpense from "../Screens/AddExpense";
import { Route, withRouter } from "react-router-dom";
import Logo from "../Assets/Images/logo.png";
import Profile from "../Screens/Profile";
import { useRecoilValue } from "recoil";
import { userState } from "../Recoil/Auth";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    height: 119,
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#1f2937",
    boxShadow: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "black",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: "#1f2937",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logoImage: {
    width: 225,
    height: 46,
  },
  listStyle: {
    background: "#1f2937",
    color: "white",
    height: "100%",
  },
  listIconStyle: {
    color: "white",
    marginRight: 10,
  },
  listItemIcon: {
    minWidth: "unset",
  },
  selected: {
    backgroundColor: "#8950a3",
    height: 59,
  },
  hoverItem: {
    height: 59,
    "&:hover": {
      backgroundColor: "#8950a3",
    },
  },
  notificationItem: {
    height: 59,
    "&:hover": {
      backgroundColor: "white",
    },
  },
  menuTypography: {
    fontSize: 14,
    fontWeight: "bold",
  },
  menuIcon: {
    marginRight: 10,
  },
  notificationIcon: {
    color: "grey",
    cursor: "pointer",
    marginRight: 10,
    "&:hover": {
      color: "#8950a3",
    },
  },
  profileIcon: {
    color: "grey",
    cursor: "pointer",
    "&:hover": {
      color: "#8950a3",
    },
  },
  notificationViewAll: {
    color: "#8950a3",
    fontSize: 13,
    fontWeight: "bold",
    height: 40,
    "&:hover": {
      backgroundColor: "#8950a3",
      color: "white",
    },
  },
  desktopControls: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function MainDrawer(props) {
  const { window: testWin } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const [routes, setRoutes] = React.useState({
    dashboard: true,
    newsletters: false,
  });
  const user = useRecoilValue(userState);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseNotificationTray = () => {
    setAnchorElNotification(null);
  };

  const handleRoutes = (route) => {
    const tempObj = routes;
    Object.keys(tempObj).forEach(function (key) {
      tempObj[key] = key === route;
    });
    setRoutes(setRoutes);
  };

  const drawer = (
    <div className={classes.listStyle}>
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      <List style={{ marginTop: -20 }}>
        <ListItem
          button
          className={`${classes.hoverItem} ${
            routes?.dashboard ? classes.selected : null
          }`}
          onClick={() => {
            props.history.push("/");
            handleRoutes("dashboard");
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <MenuIcon className={classes.listIconStyle} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.menuTypography}>
                Dashboard
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          onClick={() => {
            props.history.push("/ledger");
            handleRoutes("newsletters");
          }}
          button
          className={`${classes.hoverItem} ${
            routes?.newsletters ? classes.selected : null
          }`}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DescriptionIcon className={classes.listIconStyle} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.menuTypography}>LEDGER</Typography>
            }
          />
        </ListItem>
      </List>
    </div>
  );

  const container =
    testWin !== undefined ? () => testWin().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon className={classes.listIconStyle} />
          </IconButton>
          <Typography
            variant="h4"
            style={{
              fontWeight: "900",
              color: "#fff",
              fontSize: 42,
              cursor: "pointer",
            }}
            onClick={() => {
              props.history.push("/");
              handleRoutes("dashboard");
            }}
            className="noselect"
          >
            FINANCER
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Menu
            id="simple-menu"
            anchorEl={anchorElNotification}
            keepMounted
            open={Boolean(anchorElNotification)}
            onClose={handleCloseNotificationTray}
            style={{
              zIndex: 9999,
              marginTop: 40,
              marginLeft: -180,
            }}
          >
            {props?.limitedNotifications?.map((notification, index) => (
              <>
                <MenuItem
                  className={classes.notificationItem}
                  onClick={handleCloseNotificationTray}
                >
                  <List>
                    <ListItem>
                      <ListItemAvatar className={classes.listItemIcon}>
                        <NotificationsIcon
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography style={{ fontSize: 12, marginLeft: 10 }}>
                            {notification.message}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            style={{
                              color: "#8950a3",
                              fontSize: 11,
                              marginLeft: 10,
                              marginTop: 3,
                            }}
                          >
                            DD-MM-YYYY | hh:mm a
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </MenuItem>
                <Divider />
              </>
            ))}
            <MenuItem
              className={`${classes.notificationViewAll}`}
              onClick={() => {
                handleCloseNotificationTray();
                props.history.push("/dashboard/notifications");
              }}
            >
              <List>
                <ListItem>
                  <ListItemText primary={<Typography>View All</Typography>} />
                </ListItem>
              </List>
            </MenuItem>
          </Menu>
          <List className={classes.desktopControls}>
            <ListItem
              className={classes.profileIcon}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClickMenu}
            >
              <ListItemText
                primary={
                  <Typography
                    className={classes.menuTypography}
                    style={{ marginRight: 5, color: "white" }}
                  >
                    {user?.name ? user?.name : user?.auth?.email}
                  </Typography>
                }
              />
              <ListItemIcon className={classes.listItemIcon}>
                <ExpandMoreIcon className={classes.listIconStyle} />
              </ListItemIcon>
            </ListItem>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{
                zIndex: 9999,
                marginTop: 60,
                marginLeft: 20,
              }}
            >
              <MenuItem
                className={classes.hoverItem}
                onClick={() => {
                  props.history.push("/profile");
                  handleRoutes("adminProfile");
                  handleClose();
                }}
              >
                <AccountCircleIcon className={classes.menuIcon} /> Profile
              </MenuItem>
              <MenuItem
                className={classes.hoverItem}
                onClick={() => {
                  localStorage.clear();
                  props.setLogged_in(false);
                  window.location.reload();
                }}
              >
                <ExitToAppIcon className={classes.menuIcon} /> Logout
              </MenuItem>
            </Menu>
          </List>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <br />
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.toolbar} />
        <Route path="/" exact render={(props) => <Dashboard {...props} />} />
        <Route path="/ledger" exact render={(props) => <Ledger {...props} />} />
        <Route
          path="/ledger/add"
          exact
          render={(props) => <AddExpense {...props} />}
        />
        <Route
          path="/profile"
          exact
          render={(props) => <Profile {...props} />}
        />
      </main>
    </div>
  );
}

export default withRouter(MainDrawer);
