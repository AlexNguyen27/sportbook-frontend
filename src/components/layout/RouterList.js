import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import Container from "@material-ui/core/Container";

// Route
import NotFound from "../layout/NotFound";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
// import Courses from '../pages/courses/Courses';
import ProtectedRoute from "../custom/ProtectedRoute";
// import ResetPassword from "../pages/auth/ResetPassword";
import HomePageUser from "../pages/homePage/HomePageUser";
import User from "../pages/user/User";
import SearchGround from "../pages/ground/SearchGround";
import Main from "../pages/Main";
import Ground from "../pages/ground/Ground";
import Order from "../pages/order/Order";
import OrderDetail from "../pages/orderDetail/OrderDetail";

const RouterList = (props) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() => (
          <Main {...props} isHome={true} children={<HomePageUser />} />
        )}
      />
      <Route
        exact
        path="/login"
        component={() => <Main {...props} children={<Login />} />}
      />
      <Route
        exact
        path="/signup"
        component={() => <Main {...props} children={<Signup />} />}
      />
      <ProtectedRoute
        exact
        path="/user/info/yourInfo"
        component={() => (
          <Main {...props} children={<User tabKey="yourInfo" />} />
        )}
      />
      <ProtectedRoute
        exact
        path="/user/info/changePassword"
        component={() => (
          <Main {...props} children={<User tabKey="changePassword" />} />
        )}
      />

      <ProtectedRoute
        exact
        path="/user/info/history"
        component={() => (
          <Main {...props} children={<User tabKey="history" />} />
        )}
      />

      <ProtectedRoute
        exact
        path="/user/info/notification"
        component={() => (
          <Main {...props} children={<User tabKey="notification" />} />
        )}
      />

      <ProtectedRoute
        exact
        path="/user/info/extraInfo"
        component={() => (
          <Main {...props} children={<User tabKey="extraInfo" />} />
        )}
      />

      <Route
        exact
        path="/playground"
        component={() => <Main {...props} children={<SearchGround />} />}
      />
      <ProtectedRoute
        exact
        path="/order"
        component={() => <Main {...props} children={<Order />} />}
      />
      <ProtectedRoute
        exact
        path="/order-detail/:id"
        component={(props) => (
          <Main {...props} children={<OrderDetail {...props} />} />
        )}
      />
      <Route
        exact
        path="/ground/:id"
        component={(props) => (
          <Main {...props} match={props.match} children={<Ground {...props} />} />
        )}
      />
      <ProtectedRoute component={() => <NotFound center />} />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(RouterList);
