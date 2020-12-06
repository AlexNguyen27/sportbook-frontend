import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import LockIcon from "@material-ui/icons/Lock";
import Avatar from "@material-ui/core/Avatar";
import { BASE_IMAGE_URL } from "../../../store/actions/types";
import UserInfo from "./component/UserInfoForm";
import { Row, Col } from "reactstrap";
import ChangePassword from "./component/ChangePassword";
import Notification from "./component/Notification";
import History from "./component/History";
import { useHistory } from "react-router-dom";
import ExtraInformation from "../extraInfo/ExtraInformation";
import { getUserInfo } from "../../../store/actions/user";
import PageLoader from "../../custom/PageLoader";

const useStyles = makeStyles({
  root: {
    // width: 230,
  },
  top: {
    padding: "100px 0 40px 0",
  },
});

const User = ({ user, tabKey, getUserInfo }) => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedItem, setSelectedItem] = useState(tabKey);
  const menuItems = [
    {
      key: "yourInfo",
      icon: <AccountCircleIcon fontSize="small" />,
      name: "Your information",
    },
    {
      key: "extraInfo",
      icon: <SportsSoccerIcon fontSize="small" />,
      name: "Extra information",
    },
    {
      key: "history",
      icon: <WatchLaterIcon fontSize="small" />,
      name: "Order History",
    },
    {
      key: "notification",
      icon: <NotificationsActiveIcon fontSize="small" />,
      name: "Notification",
    },
    {
      key: "changePassword",
      icon: <LockIcon fontSize="small" />,
      name: "Change your password",
    },
  ];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (selectedItem === "yourInfo" || selectedItem === "extraInfo") {
      getUserInfo(setLoading);
    }
  }, [setSelectedItem, selectedItem]);

  const renderContent = {
    yourInfo: (
      <UserInfo viewType="user" loading={loading} setLoading={setLoading} />
    ),
    history: <History />,
    changePassword: <ChangePassword />,
    notification: <Notification />,
    extraInfo: <ExtraInformation loading={loading} setLoading={setLoading} />,
  };

  const { avatar, firstName, lastName } = user;

  return (
    <Row className={classes.top} style={{ justifyContent: "center" }}>
      <Col xs={2}>
        <Paper className={classes.root} elevation={3}>
          <Row style={{ justifyContent: "center", paddingTop: "10px" }}>
            <Col xs={3}>
              <Avatar
                style={{ marginLeft: "auto " }}
                alt="Remy Sharp"
                src={avatar || BASE_IMAGE_URL}
              />
            </Col>
            <Col xs={8}>
              <h4>
                {firstName} {lastName}
              </h4>
            </Col>
          </Row>
          <hr style={{ margin: "10px 0 0 0" }} />
          <Col>
            <MenuList>
              {menuItems.map((item) => (
                <MenuItem
                  onClick={() => {
                    setSelectedItem(item.key);
                    history.push(`/user/info/${item.key}`);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <Typography
                    variant="inherit"
                    style={{
                      fontWeight: item.key === selectedItem ? "bold" : "",
                    }}
                  >
                    {item.name}
                  </Typography>
                </MenuItem>
              ))}
            </MenuList>
          </Col>
        </Paper>
      </Col>
      <Col xs={7}>{renderContent[selectedItem]}</Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { getUserInfo })(User);
