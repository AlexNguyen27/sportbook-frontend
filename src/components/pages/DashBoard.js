import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, fade, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
// MATERIAL CORE
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import ReportIcon from "@material-ui/icons/Report";
import CategoryIcon from "@material-ui/icons/Category";
import "../../css/index.css";

// MATERIAL ICONS
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MailIcon from "@material-ui/icons/Mail";
import Colors from "../../constants/Colors";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import BarChartIcon from "@material-ui/icons/BarChart";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import HelpIcon from "@material-ui/icons/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";

import jwt_decode from "jwt-decode";
import HomeIcon from "@material-ui/icons/Home";
// import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Link, NavLink } from "react-router-dom";

// COMPONENT
// ACTION
import { logoutUser } from "../../store/actions/auth";
import { Avatar } from "@material-ui/core";
import UserInfo from "./user/UserInfo";
import ChangePasswordModal from "./user/component/ChangePasswordModal";
import { BASE_URL } from "../../store/actions/types";
import PostsList from "./post/PostsList";
import UserProfile from "./userProfile/UserProfile";
import CategoryList from "./category/CategoryList";
import ReportsList from "./report/ReportsList";
import StatisticsPost from "./statistics/user/StatisticsPost";
import NewsFeed from "./newsFeed/NewsFeed";
import Users from "./user/Users";
import AddPost from "./post/component/AddPost";
import EditPost from "./post/component/EditPost";
import UsersList from "./admin/UsersList";
import ViewPost from "./post/component/ViewPost";
import { getUserProfile } from "../../store/actions/user";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: 0,
    maxWidth: "1500px !important",
  },
  appBar: {
    background: Colors.purple,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "400px !important",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  header: {
    background: Colors.light_purple,
    fontWeight: 550,
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    minHeight: "54px",
    padding: theme.spacing(0, 1),
    // necessary for content to b
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
  content: {
    backgroundColor: Colors.background,
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    backgroundColor: Colors.background,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const DashBoard = ({
  history,
  location,
  logoutUser,
  getUserProfile,
  auth: { isAuthenticated, user, isAdmin, token },
  match,
}) => {
  // Check if token is expired
  if (token) {
    const decoded = jwt_decode(token);
    // console.log(decoded);
    const currentTime = Date.now() / 1000;
    // if (decoded.iat <= currentTime) {
    //   logoutUser();
    // }
  }
  const [drawerId, setDrawerId] = useState(isAdmin ? "usersList" : "newsFeed");

  const classes = useStyles();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  // get user profile after get into dashboard
  useEffect(() => {
    getUserProfile(user.id, setLoading);
  }, []);

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [modalChangePassword, setModalChangePassword] = useState(false);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);

    history.push("/login");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push("/user-info");
  };

  const handeOnChangePassword = () => {
    // handleMobileMenuClose();
    setModalChangePassword(true);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () => {
    Swal.fire({
      title: `Are you sure to logout?`,
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sure",
    }).then((result) => {
      if (result.value) {
        logoutUser();
        history.push("/login");
      }
    });
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handeOnChangePassword}>Change password</MenuItem>
    </Menu>
  );

  const renderSetting = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={() => setMobileMoreAnchorEl(null)}
    >
      <MenuItem disabled onClick={handleMobileMenuClose}>
        Setting
      </MenuItem>
      <MenuItem onClick={() => logout()}>Logout</MenuItem>
    </Menu>
  );

  const renderContent = (drawerId) => {
    if (match.params.userId && match.path.includes("edit-user")) {
      return (
        <>
          <UserInfo />
        </>
      );
    }

    if (match.params.userId && match.path.includes("user-profile")) {
      return (
        <>
          <UserProfile userId={match.params.userId} />
        </>
      );
    }

    if (match.params.userId && match.path.includes("statistics")) {
      return (
        <>
          <StatisticsPost userId={match.params.userId} />
        </>
      );
    }

    if (match.params.postId && match.path.includes("view-post")) {
      return (
        <>
          <ViewPost postId={match.params.postId} />
        </>
      );
    }

    if (match.params.postId && match.path.includes("edit-post")) {
      return (
        <>
          <EditPost postId={match.params.postId} />
        </>
      );
    }
    switch (match.path) {
      case "/users-list":
        return (
          <>
            <UsersList />
          </>
        );
      case "/posts-list":
        return (
          <>
            <PostsList />
          </>
        );
      case "/reports-list":
        return (
          <>
            <ReportsList />
          </>
        );
      case "/categories-list":
        return (
          <>
            <CategoryList />
          </>
        );
      case "/news-feed":
        return (
          <>
            <NewsFeed location={location} />
          </>
        );
      case "/add-new-post":
        return (
          <>
            <AddPost />
          </>
        );
      case "/people":
        return (
          <>
            <Users location={location} />
          </>
        );
      case "/user-info":
        return (
          <>
            <UserInfo />
          </>
        );
      default:
        return (
          <Fragment>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
              Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
              ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
              aliquam sem et tortor. Habitant morbi tristique senectus et.
              Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
              aenean euismod elementum nisi quis eleifend. Commodo viverra
              maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a.
            </Typography>
          </Fragment>
        );
    }
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const navList1 = [
    {
      key: "newsFeed",
      icon: <HomeIcon />,
      to: "/news-feed",
      title: "News Feed",
    },
    {
      key: "people",
      icon: <PeopleAltIcon />,
      to: "/people",
      title: "People",
    },
    {
      key: "userProfile",
      icon: <ArtTrackIcon />,
      to: `/user-profile/${user.id}`,
      title: "Your Profile",
    },
    {
      key: "statistics",
      icon: <BarChartIcon />,
      to: `/statistics/${user.id}`,
      title: "Statistics",
    },
  ];

  const navList3 = [
    {
      key: "usersList",
      icon: <PeopleAltIcon />,
      to: "/users-list",
      title: "User",
    },
    {
      key: "posts",
      icon: <ChromeReaderModeIcon />,
      to: "/posts-list",
      title: "Post",
    },
    {
      key: "report",
      icon: <ReportIcon />,
      to: "/reports-list",
      title: "Report",
    },
    {
      key: "category",
      icon: <CategoryIcon />,
      to: "/categories-list",
      title: "Category",
    },
  ];

  const navList2 = [
    { key: "help", icon: <HelpIcon />, to: "/help", title: "Help" },
    {
      key: "Notifications",
      icon: <NotificationsIcon />,
      to: "/notifications",
      title: "Notifications",
    },
    { key: "Mails", icon: <MailIcon />, to: "/mails", title: "Mails" },
    {
      key: "Logout",
      icon: <ExitToAppIcon />,
      title: "Logout",
      onClick: () => logout(),
    },
  ];

  const formatUrl = (url) => {
    const test = url.split("/");
    const res = test[1]
      .replace(/[^a-zA-Z0-9]/g, " ")
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    return res.replace("id", "");
  };

  const setSearchText = (search) => {
    if (match.path === "/people" || match.path === "/news-feed") {
      history.push({
        pathname: `${window.location.pathname}`,
        search: `?search=${search}`,
        searchText: search,
      });
    }
  };

  return (
    <div className={classes.root}>
      <ChangePasswordModal
        modal={modalChangePassword}
        setModal={setModalChangePassword}
      />
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {formatUrl(match.path)}
          </Typography>
          <div
            className={classes.search}
            style={{
              display:
                match.path === "/people" || match.path === "/news-feed"
                  ? "block"
                  : "none",
            }}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={
                match.path === "/people" ? "Search friends…" : "Search posts..."
              }
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={9} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={10} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <p className="m-0 mr-2" style={{ fontSize: "19px" }}>
                {user ? user.username : ""}
              </p>
              <Avatar
                alt="User Image"
                src={
                  (user && user.imageUrl) ||
                  "https://image.plo.vn/w653/Uploaded/2020/xpckxpiu/2020_05_31/lisa_goix.jpg"
                }
              />
            </IconButton>
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          {renderMenu}
          {renderSetting}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <strong>DEV TROOPS</strong>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}
        </div>
        <Divider />
        {console.log(drawerId)}
        <List>
          {(isAdmin ? navList3 : navList1).map((item) => (
            <ListItem
              button
              key={item.key}
              component={Link}
              to={item.to}
              onClick={() => setDrawerId(item.key)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>
                <span
                  style={{ fontWeight: drawerId === item.key ? "bold" : "" }}
                >
                  {item.title}
                </span>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {navList2.map((item) => (
            <ListItem
              button
              key={item.key}
              component={Link}
              to={item.to}
              onClick={item.onClick || (() => setDrawerId(item.key))}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {renderContent(drawerId)}
      </main>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser, getUserProfile })(
  DashBoard
);
